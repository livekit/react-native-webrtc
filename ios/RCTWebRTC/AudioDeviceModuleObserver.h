#import <WebRTC/WebRTC.h>
#import "WebRTCModule.h"

NS_ASSUME_NONNULL_BEGIN

@interface AudioDeviceModuleObserver : NSObject<RTCAudioDeviceModuleDelegate>

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

// Native default audio-session configuration policy. When set (non-nil) and no
// custom JS handler is registered for willEnable/didDisable, the observer
// configures the AVAudioSession natively on the worker thread instead of doing a
// JS round trip. Pushed once from JS, and nil disables it. Reassigning or
// clearing the policy is safe: activation state is tracked against
// RTCAudioSession itself, not against the policy, and a hold orphaned by
// clearing is released at the next full stop. One consequence: clearing a
// deactivateOnStop:NO policy while the engine is already stopped keeps the
// session activation held (and the OS session active) until the next engine
// cycle, because no callback fires in between. Callers who need an immediate
// release should stop under a deactivateOnStop:YES policy before clearing.
//
// Precedence is evaluated per hook, so custom willEnable and didDisable JS
// handlers must be registered or cleared as a pair while a policy is set. A JS
// handler owning one hook while the native policy owns the other can activate a
// session that the owning regime never releases. Shape:
//   @{ @"recording": <cfg>, @"playout": <cfg>, @"deactivateOnStop": @(BOOL) }
// where <cfg> is @{ @"audioCategory": str, @"audioMode": str,
//                   @"audioCategoryOptions": @[str...] }.
@property(atomic, copy, nullable) NSDictionary *automaticAudioSessionConfig;

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
