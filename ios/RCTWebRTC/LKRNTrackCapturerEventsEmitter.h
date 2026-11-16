#import "LKRNCaptureController.h"
#import "LKRNCapturerEventsDelegate.h"
#import "LKRNWebRTCModule.h"

NS_ASSUME_NONNULL_BEGIN

@interface LKRNTrackCapturerEventsEmitter : NSObject<LKRNCapturerEventsDelegate>

- (instancetype)initWith:(NSString *)trackId webRTCModule:(LKRNWebRTCModule *)module;

- (void)capturerDidEnd:(LKRTCVideoCapturer *)capturer;
@end

NS_ASSUME_NONNULL_END
