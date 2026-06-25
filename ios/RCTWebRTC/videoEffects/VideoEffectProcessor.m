#import <LiveKitWebRTC/RTCVideoCapturer.h>

#import "VideoEffectProcessor.h"

@implementation VideoEffectProcessor

- (instancetype)initWithProcessors:(NSArray<NSObject<VideoFrameProcessorDelegate> *> *)videoFrameProcessors
                       videoSource:(LKRTCVideoSource *)videoSource {
    self = [super init];
    _videoFrameProcessors = videoFrameProcessors;
    _videoSource = videoSource;
    return self;
}

- (void)capturer:(nonnull LKRTCVideoCapturer *)capturer didCaptureVideoFrame:(nonnull LKRTCVideoFrame *)frame {
    LKRTCVideoFrame *processedFrame = frame;
    for (NSObject<VideoFrameProcessorDelegate> *processor in _videoFrameProcessors) {
        processedFrame = [processor capturer:capturer didCaptureVideoFrame:processedFrame];
    }
    [self.videoSource capturer:capturer didCaptureVideoFrame:processedFrame];
}

@end
