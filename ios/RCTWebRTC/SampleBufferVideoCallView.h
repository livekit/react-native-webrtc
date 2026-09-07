#import <AVKit/AVKit.h>
#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import <LiveKitWebRTC/RTCVideoRenderer.h>

@interface SampleBufferVideoCallView : UIView<LKRTCVideoRenderer>

@property(nonnull, nonatomic, readonly) AVSampleBufferDisplayLayer *sampleBufferLayer;
@property(nonatomic, assign) BOOL shouldRender;

- (void)requestScaleRecalculation;
@end
