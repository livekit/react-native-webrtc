#import <LiveKitWebRTC/RTCVideoCapturer.h>
#import <LiveKitWebRTC/RTCVideoFrame.h>

@protocol LKRNVideoFrameProcessorDelegate

- (LKRTCVideoFrame *)capturer:(LKRTCVideoCapturer *)capturer didCaptureVideoFrame:(LKRTCVideoFrame *)frame;

@end
