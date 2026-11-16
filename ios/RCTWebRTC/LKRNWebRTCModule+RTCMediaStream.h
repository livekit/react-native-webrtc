#import "LKRNCaptureController.h"
#import "LKRNVideoEffectProcessor.h"
#import "LKRNWebRTCModule.h"

@interface LKRNWebRTCModule (RTCMediaStream)

@property(nonatomic, strong) LKRNVideoEffectProcessor *videoEffectProcessor;

- (LKRTCVideoTrack *)createVideoTrackWithCaptureController:
    (LKRNCaptureController * (^)(LKRTCVideoSource *))captureControllerCreator;
- (NSArray *)createMediaStream:(NSArray<LKRTCMediaStreamTrack *> *)tracks;

- (LKRTCMediaStreamTrack *)trackForId:(nonnull NSString *)trackId pcId:(nonnull NSNumber *)pcId;
@end