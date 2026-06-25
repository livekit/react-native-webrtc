#import <LiveKitWebRTC/RTCVideoCapturer.h>

NS_ASSUME_NONNULL_BEGIN

@protocol CapturerEventsDelegate

/** Called when the capturer is ended and in an irrecoverable state. */
- (void)capturerDidEnd:(LKRTCVideoCapturer *)capturer;

@end

NS_ASSUME_NONNULL_END
