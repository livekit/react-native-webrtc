#import <LiveKitWebRTC/RTCVideoSource.h>

#import "VideoFrameProcessor.h"

@interface VideoEffectProcessor : NSObject<LKRTCVideoCapturerDelegate>

@property(nonatomic, strong) NSArray<NSObject<VideoFrameProcessorDelegate> *> *videoFrameProcessors;
@property(nonatomic, strong) LKRTCVideoSource *videoSource;

- (instancetype)initWithProcessors:(NSArray<NSObject<VideoFrameProcessorDelegate> *> *)videoFrameProcessors
                       videoSource:(LKRTCVideoSource *)videoSource;

@end
