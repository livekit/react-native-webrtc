#import <LiveKitWebRTC/RTCVideoCapturer.h>
#import <LiveKitWebRTC/RTCVideoFrame.h>

@protocol VideoFrameProcessorDelegate

- (LKRTCVideoFrame *)capturer:(LKRTCVideoCapturer *)capturer didCaptureVideoFrame:(LKRTCVideoFrame *)frame;

@end
