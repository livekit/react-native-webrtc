#import <WebRTC/WebRTC.h>
#import "WebRTCModule.h"

NS_ASSUME_NONNULL_BEGIN

@interface AudioDeviceModuleObserver : NSObject<RTCAudioDeviceModuleDelegate>

- (instancetype)initWithWebRTCModule:(WebRTCModule *)module;

// Tracks whether each JS handler is registered. When NO, the observer returns
// immediately without a JS round trip, avoiding the deadlock window entirely.
@property(nonatomic, assign) BOOL isEngineCreatedActive;
@property(nonatomic, assign) BOOL isWillEnableEngineActive;
@property(nonatomic, assign) BOOL isWillStartEngineActive;
@property(nonatomic, assign) BOOL isDidStopEngineActive;
@property(nonatomic, assign) BOOL isDidDisableEngineActive;
@property(nonatomic, assign) BOOL isWillReleaseEngineActive;

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
