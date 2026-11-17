#import <LiveKitWebRTC/RTCVideoSource.h>

#import "LKRNVideoFrameProcessor.h"

@interface LKRNVideoEffectProcessor : NSObject<LKRTCVideoCapturerDelegate>

@property(nonatomic, strong) NSArray<NSObject<LKRNVideoFrameProcessorDelegate> *> *videoFrameProcessors;
@property(nonatomic, strong) LKRTCVideoSource *videoSource;

- (instancetype)initWithProcessors:(NSArray<NSObject<LKRNVideoFrameProcessorDelegate> *> *)videoFrameProcessors
                       videoSource:(LKRTCVideoSource *)videoSource;

@end
