#import <WebRTC/WebRTC.h>
#import "WebRTCModule.h"

NS_ASSUME_NONNULL_BEGIN

@interface AudioDeviceModuleObserver : NSObject <RTCAudioDeviceModuleDelegate>

- (instancetype)initWithWebRTCModule:(WebRTCModule *)module;

// Methods to receive results from JS
- (void)resolveEngineCreatedWithResult:(NSInteger)result;
- (void)resolveWillEnableEngineWithResult:(NSInteger)result;
- (void)resolveWillStartEngineWithResult:(NSInteger)result;
- (void)resolveDidStopEngineWithResult:(NSInteger)result;
- (void)resolveDidDisableEngineWithResult:(NSInteger)result;
- (void)resolveWillReleaseEngineWithResult:(NSInteger)result;

@end

NS_ASSUME_NONNULL_END
