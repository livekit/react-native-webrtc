
#import "DataChannelWrapper.h"

#import <LiveKitWebRTC/RTCDataChannel.h>

@interface DataChannelWrapper ()<LKRTCDataChannelDelegate>
@end

@implementation DataChannelWrapper

- (instancetype)initWithChannel:(LKRTCDataChannel *)channel reactTag:(NSString *)tag {
    self = [super init];
    if (self) {
        _channel = channel;
        _reactTag = tag;

        // Set ourselves as the deletagate.
        _channel.delegate = self;
    }

    return self;
}

- (void)dataChannel:(nonnull LKRTCDataChannel *)dataChannel didReceiveMessageWithBuffer:(nonnull LKRTCDataBuffer *)buffer {
    if (_delegate) {
        [_delegate dataChannel:self didReceiveMessageWithBuffer:buffer];
    }
}

- (void)dataChannelDidChangeState:(nonnull LKRTCDataChannel *)dataChannel {
    if (_delegate) {
        [_delegate dataChannelDidChangeState:self];
    }
}

- (void)dataChannel:(nonnull LKRTCDataChannel *)dataChannel didChangeBufferedAmount:(uint64_t)amount {
    if (_delegate) {
        [_delegate dataChannel:self didChangeBufferedAmount:amount];
    }
}

@end
