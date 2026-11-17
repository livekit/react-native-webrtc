
#import <LiveKitWebRTC/RTCPeerConnection.h>
#import "LKRNWebRTCModule.h"

@interface LKRTCPeerConnection (VideoTrackAdapter)

@property(nonatomic, strong) NSMutableDictionary<NSString *, id> *videoTrackAdapters;

- (void)addVideoTrackAdapter:(LKRTCVideoTrack *)track;
- (void)removeVideoTrackAdapter:(LKRTCVideoTrack *)track;

@end
