#import "AudioDeviceModuleObserver.h"
#import <React/RCTLog.h>

NS_ASSUME_NONNULL_BEGIN

@interface AudioDeviceModuleObserver ()

@property(weak, nonatomic) WebRTCModule *module;
@property(nonatomic, strong) dispatch_semaphore_t engineCreatedSemaphore;
@property(nonatomic, strong) dispatch_semaphore_t willEnableEngineSemaphore;
@property(nonatomic, strong) dispatch_semaphore_t willStartEngineSemaphore;
@property(nonatomic, strong) dispatch_semaphore_t didStopEngineSemaphore;
@property(nonatomic, strong) dispatch_semaphore_t didDisableEngineSemaphore;
@property(nonatomic, strong) dispatch_semaphore_t willReleaseEngineSemaphore;

@property(nonatomic, assign) NSInteger engineCreatedResult;
@property(nonatomic, assign) NSInteger willEnableEngineResult;
@property(nonatomic, assign) NSInteger willStartEngineResult;
@property(nonatomic, assign) NSInteger didStopEngineResult;
@property(nonatomic, assign) NSInteger didDisableEngineResult;
@property(nonatomic, assign) NSInteger willReleaseEngineResult;

@end

@implementation AudioDeviceModuleObserver

- (instancetype)initWithWebRTCModule:(WebRTCModule *)module {
    self = [super init];
    if (self) {
        self.module = module;
        _engineCreatedSemaphore = dispatch_semaphore_create(0);
        _willEnableEngineSemaphore = dispatch_semaphore_create(0);
        _willStartEngineSemaphore = dispatch_semaphore_create(0);
        _didStopEngineSemaphore = dispatch_semaphore_create(0);
        _didDisableEngineSemaphore = dispatch_semaphore_create(0);
        _willReleaseEngineSemaphore = dispatch_semaphore_create(0);
    }
    return self;
}

#pragma mark - RTCAudioDeviceModuleDelegate

- (void)audioDeviceModule:(RTCAudioDeviceModule *)audioDeviceModule
    didReceiveSpeechActivityEvent:(RTCSpeechActivityEvent)speechActivityEvent {
    NSString *eventType = speechActivityEvent == RTCSpeechActivityEventStarted ? @"started" : @"ended";

    [self.module sendEventWithName:kEventAudioDeviceModuleSpeechActivity
                              body:@{
                                  @"event" : eventType,
                              }];

    RCTLog(@"[AudioDeviceModuleObserver] Speech activity event: %@", eventType);
}

- (NSInteger)audioDeviceModule:(RTCAudioDeviceModule *)audioDeviceModule didCreateEngine:(AVAudioEngine *)engine {
    RCTLog(@"[AudioDeviceModuleObserver] Engine created - waiting for JS response");

    [self.module sendEventWithName:kEventAudioDeviceModuleEngineCreated body:@{}];

    // Wait indefinitely for JS to respond
    dispatch_semaphore_wait(self.engineCreatedSemaphore, DISPATCH_TIME_FOREVER);

    RCTLog(@"[AudioDeviceModuleObserver] Engine created - JS returned: %ld", (long)self.engineCreatedResult);
    return self.engineCreatedResult;
}

- (NSInteger)audioDeviceModule:(RTCAudioDeviceModule *)audioDeviceModule
              willEnableEngine:(AVAudioEngine *)engine
              isPlayoutEnabled:(BOOL)isPlayoutEnabled
            isRecordingEnabled:(BOOL)isRecordingEnabled {
    RCTLog(@"[AudioDeviceModuleObserver] Engine will enable - playout: %d, recording: %d - waiting for JS response",
           isPlayoutEnabled,
           isRecordingEnabled);

    [self.module sendEventWithName:kEventAudioDeviceModuleEngineWillEnable
                              body:@{
                                  @"isPlayoutEnabled" : @(isPlayoutEnabled),
                                  @"isRecordingEnabled" : @(isRecordingEnabled),
                              }];

    // Wait indefinitely for JS to respond
    dispatch_semaphore_wait(self.willEnableEngineSemaphore, DISPATCH_TIME_FOREVER);

    RCTLog(@"[AudioDeviceModuleObserver] Engine will enable - JS returned: %ld", (long)self.willEnableEngineResult);

    AVAudioSession *audioSession = [AVAudioSession sharedInstance];
    RCTLog(@"[AudioDeviceModuleObserver] Audio session category: %@", audioSession.category);

    return self.willEnableEngineResult;
}

- (NSInteger)audioDeviceModule:(RTCAudioDeviceModule *)audioDeviceModule
               willStartEngine:(AVAudioEngine *)engine
              isPlayoutEnabled:(BOOL)isPlayoutEnabled
            isRecordingEnabled:(BOOL)isRecordingEnabled {
    RCTLog(@"[AudioDeviceModuleObserver] Engine will start - playout: %d, recording: %d - waiting for JS response",
           isPlayoutEnabled,
           isRecordingEnabled);

    [self.module sendEventWithName:kEventAudioDeviceModuleEngineWillStart
                              body:@{
                                  @"isPlayoutEnabled" : @(isPlayoutEnabled),
                                  @"isRecordingEnabled" : @(isRecordingEnabled),
                              }];

    // Wait indefinitely for JS to respond
    dispatch_semaphore_wait(self.willStartEngineSemaphore, DISPATCH_TIME_FOREVER);

    RCTLog(@"[AudioDeviceModuleObserver] Engine will start - JS returned: %ld", (long)self.willStartEngineResult);
    return self.willStartEngineResult;
}

- (NSInteger)audioDeviceModule:(RTCAudioDeviceModule *)audioDeviceModule
                 didStopEngine:(AVAudioEngine *)engine
              isPlayoutEnabled:(BOOL)isPlayoutEnabled
            isRecordingEnabled:(BOOL)isRecordingEnabled {
    RCTLog(@"[AudioDeviceModuleObserver] Engine did stop - playout: %d, recording: %d - waiting for JS response",
           isPlayoutEnabled,
           isRecordingEnabled);

    [self.module sendEventWithName:kEventAudioDeviceModuleEngineDidStop
                              body:@{
                                  @"isPlayoutEnabled" : @(isPlayoutEnabled),
                                  @"isRecordingEnabled" : @(isRecordingEnabled),
                              }];

    // Wait indefinitely for JS to respond
    dispatch_semaphore_wait(self.didStopEngineSemaphore, DISPATCH_TIME_FOREVER);

    RCTLog(@"[AudioDeviceModuleObserver] Engine did stop - JS returned: %ld", (long)self.didStopEngineResult);
    return self.didStopEngineResult;
}

- (NSInteger)audioDeviceModule:(RTCAudioDeviceModule *)audioDeviceModule
              didDisableEngine:(AVAudioEngine *)engine
              isPlayoutEnabled:(BOOL)isPlayoutEnabled
            isRecordingEnabled:(BOOL)isRecordingEnabled {
    RCTLog(@"[AudioDeviceModuleObserver] Engine did disable - playout: %d, recording: %d - waiting for JS response",
           isPlayoutEnabled,
           isRecordingEnabled);

    [self.module sendEventWithName:kEventAudioDeviceModuleEngineDidDisable
                              body:@{
                                  @"isPlayoutEnabled" : @(isPlayoutEnabled),
                                  @"isRecordingEnabled" : @(isRecordingEnabled),
                              }];

    // Wait indefinitely for JS to respond
    dispatch_semaphore_wait(self.didDisableEngineSemaphore, DISPATCH_TIME_FOREVER);

    RCTLog(@"[AudioDeviceModuleObserver] Engine did disable - JS returned: %ld", (long)self.didDisableEngineResult);
    return self.didDisableEngineResult;
}

- (NSInteger)audioDeviceModule:(RTCAudioDeviceModule *)audioDeviceModule willReleaseEngine:(AVAudioEngine *)engine {
    RCTLog(@"[AudioDeviceModuleObserver] Engine will release - waiting for JS response");

    [self.module sendEventWithName:kEventAudioDeviceModuleEngineWillRelease body:@{}];

    // Wait indefinitely for JS to respond
    dispatch_semaphore_wait(self.willReleaseEngineSemaphore, DISPATCH_TIME_FOREVER);

    RCTLog(@"[AudioDeviceModuleObserver] Engine will release - JS returned: %ld", (long)self.willReleaseEngineResult);
    return self.willReleaseEngineResult;
}

- (NSInteger)audioDeviceModule:(RTCAudioDeviceModule *)audioDeviceModule
                        engine:(AVAudioEngine *)engine
      configureInputFromSource:(nullable AVAudioNode *)source
                 toDestination:(AVAudioNode *)destination
                    withFormat:(AVAudioFormat *)format
                       context:(NSDictionary *)context {
    RCTLog(@"[AudioDeviceModuleObserver] Configure input - format: %@", format);
    return 0;
}

- (NSInteger)audioDeviceModule:(RTCAudioDeviceModule *)audioDeviceModule
                        engine:(AVAudioEngine *)engine
     configureOutputFromSource:(AVAudioNode *)source
                 toDestination:(nullable AVAudioNode *)destination
                    withFormat:(AVAudioFormat *)format
                       context:(NSDictionary *)context {
    RCTLog(@"[AudioDeviceModuleObserver] Configure output - format: %@", format);
    return 0;
}

- (void)audioDeviceModuleDidUpdateDevices:(RTCAudioDeviceModule *)audioDeviceModule {
    [self.module sendEventWithName:kEventAudioDeviceModuleDevicesUpdated body:@{}];

    RCTLog(@"[AudioDeviceModuleObserver] Devices updated");
}

#pragma mark - Resolve methods from JS

- (void)resolveEngineCreatedWithResult:(NSInteger)result {
    self.engineCreatedResult = result;
    dispatch_semaphore_signal(self.engineCreatedSemaphore);
}

- (void)resolveWillEnableEngineWithResult:(NSInteger)result {
    self.willEnableEngineResult = result;
    dispatch_semaphore_signal(self.willEnableEngineSemaphore);
}

- (void)resolveWillStartEngineWithResult:(NSInteger)result {
    self.willStartEngineResult = result;
    dispatch_semaphore_signal(self.willStartEngineSemaphore);
}

- (void)resolveDidStopEngineWithResult:(NSInteger)result {
    self.didStopEngineResult = result;
    dispatch_semaphore_signal(self.didStopEngineSemaphore);
}

- (void)resolveDidDisableEngineWithResult:(NSInteger)result {
    self.didDisableEngineResult = result;
    dispatch_semaphore_signal(self.didDisableEngineSemaphore);
}

- (void)resolveWillReleaseEngineWithResult:(NSInteger)result {
    self.willReleaseEngineResult = result;
    dispatch_semaphore_signal(self.willReleaseEngineSemaphore);
}

@end

NS_ASSUME_NONNULL_END
