#import <objc/runtime.h>

#import <React/RCTBridge.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventDispatcher.h>

#import <LiveKitWebRTC/RTCDataChannelConfiguration.h>
#import "WebRTCModule+RTCDataChannel.h"
#import "WebRTCModule+RTCPeerConnection.h"

@implementation WebRTCModule (LKRTCDataChannel)

/*
 * Thuis methos is implemented synchronously since we need to create the DataChannel on the spot
 * and where is no good way to report an error at creation time.
 */
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(createDataChannel
                                       : (nonnull NSNumber *)peerConnectionId label
                                       : (NSString *)label config
                                       : (LKRTCDataChannelConfiguration *)config) {
    __block id channelInfo;

    dispatch_sync(self.workerQueue, ^{
        LKRTCPeerConnection *peerConnection = self.peerConnections[peerConnectionId];

        if (peerConnection == nil) {
            RCTLogWarn(@"PeerConnection %@ not found", peerConnectionId);
            channelInfo = nil;
            return;
        }

        LKRTCDataChannel *dataChannel = [peerConnection dataChannelForLabel:label configuration:config];

        if (dataChannel == nil) {
            channelInfo = nil;
            return;
        }

        NSString *reactTag = [[NSUUID UUID] UUIDString];
        DataChannelWrapper *dcw = [[DataChannelWrapper alloc] initWithChannel:dataChannel reactTag:reactTag];
        dcw.pcId = peerConnectionId;
        peerConnection.dataChannels[reactTag] = dcw;
        dcw.delegate = self;

        channelInfo = @{
            @"peerConnectionId" : peerConnectionId,
            @"reactTag" : reactTag,
            @"label" : dataChannel.label,
            @"id" : @(dataChannel.channelId),
            @"ordered" : @(dataChannel.isOrdered),
            @"maxPacketLifeTime" : @(dataChannel.maxPacketLifeTime),
            @"maxRetransmits" : @(dataChannel.maxRetransmits),
            @"protocol" : dataChannel.protocol,
            @"negotiated" : @(dataChannel.isNegotiated),
            @"readyState" : [self stringForDataChannelState:dataChannel.readyState]
        };
    });

    return channelInfo;
}

RCT_EXPORT_METHOD(dataChannelClose
                  : (nonnull NSNumber *)peerConnectionId reactTag
                  : (nonnull NSString *)tag {
                      LKRTCPeerConnection *peerConnection = self.peerConnections[peerConnectionId];
                      DataChannelWrapper *dcw = peerConnection.dataChannels[tag];
                      if (dcw) {
                          [dcw.channel close];
                      }
                  })

RCT_EXPORT_METHOD(dataChannelDispose
                  : (nonnull NSNumber *)peerConnectionId reactTag
                  : (nonnull NSString *)tag {
                      LKRTCPeerConnection *peerConnection = self.peerConnections[peerConnectionId];
                      DataChannelWrapper *dcw = peerConnection.dataChannels[tag];
                      if (dcw) {
                          dcw.delegate = nil;
                          [peerConnection.dataChannels removeObjectForKey:tag];
                      }
                  })

RCT_EXPORT_METHOD(dataChannelSend
                  : (nonnull NSNumber *)peerConnectionId reactTag
                  : (nonnull NSString *)tag data
                  : (NSString *)data type
                  : (NSString *)type {
                      LKRTCPeerConnection *peerConnection = self.peerConnections[peerConnectionId];
                      DataChannelWrapper *dcw = peerConnection.dataChannels[tag];
                      if (dcw) {
                          BOOL isBinary = [type isEqualToString:@"binary"];
                          NSData *bytes = isBinary ? [[NSData alloc] initWithBase64EncodedString:data options:0]
                                                   : [data dataUsingEncoding:NSUTF8StringEncoding];
                          LKRTCDataBuffer *buffer = [[LKRTCDataBuffer alloc] initWithData:bytes isBinary:isBinary];
                          [dcw.channel sendData:buffer];
                      }
                  })

- (NSString *)stringForDataChannelState:(LKRTCDataChannelState)state {
    switch (state) {
        case LKRTCDataChannelStateConnecting:
            return @"connecting";
        case LKRTCDataChannelStateOpen:
            return @"open";
        case LKRTCDataChannelStateClosing:
            return @"closing";
        case LKRTCDataChannelStateClosed:
            return @"closed";
    }
    return nil;
}

#pragma mark - DataChannelWrapperDelegate methods

// Called when the data channel state has changed.
- (void)dataChannelDidChangeState:(DataChannelWrapper *)dcw {
    LKRTCDataChannel *channel = dcw.channel;
    NSDictionary *event = @{
        @"reactTag" : dcw.reactTag,
        @"peerConnectionId" : dcw.pcId,
        @"id" : @(channel.channelId),
        @"state" : [self stringForDataChannelState:channel.readyState]
    };
    [self sendEventWithName:kEventDataChannelStateChanged body:event];
}

// Called when a data buffer was successfully received.
- (void)dataChannel:(DataChannelWrapper *)dcw didReceiveMessageWithBuffer:(LKRTCDataBuffer *)buffer {
    NSString *type;
    NSString *data;
    if (buffer.isBinary) {
        type = @"binary";
        data = [buffer.data base64EncodedStringWithOptions:0];
    } else {
        type = @"text";
        // XXX NSData has a length property which means that, when it represents
        // text, the value of its bytes property does not have to be terminated by
        // null. In such a case, NSString's stringFromUTF8String may fail and return
        // nil (which would crash the process when inserting data into NSDictionary
        // without the nil protection implemented below).
        data = [[NSString alloc] initWithData:buffer.data encoding:NSUTF8StringEncoding];
    }
    NSDictionary *event = @{
        @"reactTag" : dcw.reactTag,
        @"peerConnectionId" : dcw.pcId,
        @"type" : type,
        // XXX NSDictionary will crash the process upon
        // attempting to insert nil. Such behavior is
        // unacceptable given that protection in such a
        // scenario is extremely simple.
        @"data" : (data ? data : [NSNull null])
    };
    [self sendEventWithName:kEventDataChannelReceiveMessage body:event];
}

- (void)dataChannel:(DataChannelWrapper *)dcw didChangeBufferedAmount:(uint64_t)amount {
    NSDictionary *event = @{
        @"reactTag" : dcw.reactTag,
        @"peerConnectionId" : dcw.pcId,
        @"bufferedAmount" : [NSNumber numberWithUnsignedLongLong:amount]
    };
    [self sendEventWithName:kEventDataChannelDidChangeBufferedAmount body:event];
}

@end
