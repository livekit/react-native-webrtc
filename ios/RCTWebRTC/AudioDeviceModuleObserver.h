#import <LiveKitWebRTC/LiveKitWebRTC.h>
#import "WebRTCModule.h"

NS_ASSUME_NONNULL_BEGIN

@interface AudioDeviceModuleObserver : NSObject<LKRTCAudioDeviceModuleDelegate>

- (instancetype)initWithWebRTCModule:(WebRTCModule *)module;

// Tracks whether each JS handler is registered. When NO, the observer returns
// immediately without a JS round trip, avoiding the deadlock window entirely.
// Atomic because they are written on the JS thread (handler registration) and
// read on the native audio thread (delegate callbacks).
@property(atomic, assign) BOOL isEngineCreatedActive;
@property(atomic, assign) BOOL isWillEnableEngineActive;
@property(atomic, assign) BOOL isWillStartEngineActive;
@property(atomic, assign) BOOL isDidStopEngineActive;
@property(atomic, assign) BOOL isDidDisableEngineActive;
@property(atomic, assign) BOOL isWillReleaseEngineActive;

// Methods to receive results from JS. requestId echoes the id sent with the
// corresponding event so stale responses from timed-out rounds can be dropped.
- (void)resolveEngineCreatedWithRequestId:(NSInteger)requestId result:(NSInteger)result;
- (void)resolveWillEnableEngineWithRequestId:(NSInteger)requestId result:(NSInteger)result;
- (void)resolveWillStartEngineWithRequestId:(NSInteger)requestId result:(NSInteger)result;
- (void)resolveDidStopEngineWithRequestId:(NSInteger)requestId result:(NSInteger)result;
- (void)resolveDidDisableEngineWithRequestId:(NSInteger)requestId result:(NSInteger)result;
- (void)resolveWillReleaseEngineWithRequestId:(NSInteger)requestId result:(NSInteger)result;

@end

NS_ASSUME_NONNULL_END
