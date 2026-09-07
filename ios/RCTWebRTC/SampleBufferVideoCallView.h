#import <AVKit/AVKit.h>
#import <Foundation/Foundation.h>
#import <LiveKitWebRTC/RTCVideoRenderer.h>
#import <React/RCTViewManager.h>

@interface SampleBufferVideoCallView : UIView<LKRTCVideoRenderer>

@property(nonnull, nonatomic, readonly) AVSampleBufferDisplayLayer *sampleBufferLayer;
@property(nonatomic, assign) BOOL shouldRender;

- (void)requestScaleRecalculation;
@end
