#import "CaptureController.h"
#import "VideoEffectProcessor.h"
#import "WebRTCModule.h"

@interface WebRTCModule (RTCMediaStream)

@property(nonatomic, strong) VideoEffectProcessor *videoEffectProcessor;

- (LKRTCVideoTrack *)createVideoTrackWithCaptureController:
    (CaptureController * (^)(LKRTCVideoSource *))captureControllerCreator;
- (NSArray *)createMediaStream:(NSArray<LKRTCMediaStreamTrack *> *)tracks;

- (LKRTCMediaStreamTrack *)trackForId:(nonnull NSString *)trackId pcId:(nonnull NSNumber *)pcId;
@end