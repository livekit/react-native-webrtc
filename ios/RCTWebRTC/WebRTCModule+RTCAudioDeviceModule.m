#import <objc/runtime.h>

#import <React/RCTBridge.h>
#import <React/RCTBridgeModule.h>

#import "AudioDeviceModuleObserver.h"
#import "WebRTCModule.h"

@implementation WebRTCModule (RTCAudioDeviceModule)

#pragma mark - Recording & Playback Control

RCT_EXPORT_METHOD(audioDeviceModuleStartPlayout
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
    NSInteger result = [self.audioDeviceModule startPlayout];
    if (result == 0) {
        resolve(nil);
    } else {
        reject(@"playout_error", [NSString stringWithFormat:@"Failed to start playout: %ld", (long)result], nil);
    }
}

RCT_EXPORT_METHOD(audioDeviceModuleStopPlayout
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
    NSInteger result = [self.audioDeviceModule stopPlayout];
    if (result == 0) {
        resolve(nil);
    } else {
        reject(@"playout_error", [NSString stringWithFormat:@"Failed to stop playout: %ld", (long)result], nil);
    }
}

RCT_EXPORT_METHOD(audioDeviceModuleStartRecording
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
    NSInteger result = [self.audioDeviceModule startRecording];
    if (result == 0) {
        resolve(nil);
    } else {
        reject(@"recording_error", [NSString stringWithFormat:@"Failed to start recording: %ld", (long)result], nil);
    }
}

RCT_EXPORT_METHOD(audioDeviceModuleStopRecording
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
    NSInteger result = [self.audioDeviceModule stopRecording];
    if (result == 0) {
        resolve(nil);
    } else {
        reject(@"recording_error", [NSString stringWithFormat:@"Failed to stop recording: %ld", (long)result], nil);
    }
}

RCT_EXPORT_METHOD(audioDeviceModuleStartLocalRecording
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
    NSInteger result = [self.audioDeviceModule initAndStartRecording];
    if (result == 0) {
        resolve(nil);
    } else {
        reject(
            @"recording_error", [NSString stringWithFormat:@"Failed to start local recording: %ld", (long)result], nil);
    }
}

RCT_EXPORT_METHOD(audioDeviceModuleStopLocalRecording
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
    NSInteger result = [self.audioDeviceModule stopRecording];
    if (result == 0) {
        resolve(nil);
    } else {
        reject(
            @"recording_error", [NSString stringWithFormat:@"Failed to stop local recording: %ld", (long)result], nil);
    }
}

#pragma mark - Microphone Control

RCT_EXPORT_METHOD(audioDeviceModuleSetMicrophoneMuted
                  : (BOOL)muted resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
    NSInteger result = [self.audioDeviceModule setMicrophoneMuted:muted];
    if (result == 0) {
        resolve(nil);
    } else {
        reject(@"mute_error", [NSString stringWithFormat:@"Failed to set microphone mute: %ld", (long)result], nil);
    }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleIsMicrophoneMuted) {
    return @(self.audioDeviceModule.isMicrophoneMuted);
}

#pragma mark - Voice Processing

RCT_EXPORT_METHOD(audioDeviceModuleSetVoiceProcessingEnabled
                  : (BOOL)enabled resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
    NSInteger result = [self.audioDeviceModule setVoiceProcessingEnabled:enabled];
    if (result == 0) {
        resolve(nil);
    } else {
        reject(@"voice_processing_error",
               [NSString stringWithFormat:@"Failed to set voice processing: %ld", (long)result],
               nil);
    }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleIsVoiceProcessingEnabled) {
    return @(self.audioDeviceModule.isVoiceProcessingEnabled);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleSetVoiceProcessingBypassed : (BOOL)bypassed) {
    self.audioDeviceModule.voiceProcessingBypassed = bypassed;
    return nil;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleIsVoiceProcessingBypassed) {
    return @(self.audioDeviceModule.isVoiceProcessingBypassed);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleSetVoiceProcessingAGCEnabled : (BOOL)enabled) {
    self.audioDeviceModule.voiceProcessingAGCEnabled = enabled;
    return nil;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleIsVoiceProcessingAGCEnabled) {
    return @(self.audioDeviceModule.isVoiceProcessingAGCEnabled);
}

#pragma mark - Status

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleIsPlaying) {
    return @(self.audioDeviceModule.isPlaying);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleIsRecording) {
    return @(self.audioDeviceModule.isRecording);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleIsEngineRunning) {
    return @(self.audioDeviceModule.isEngineRunning);
}

#pragma mark - Advanced Features

RCT_EXPORT_METHOD(audioDeviceModuleSetMuteMode
                  : (NSInteger)mode resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
    NSInteger result = [self.audioDeviceModule setMuteMode:(RTCAudioEngineMuteMode)mode];
    if (result == 0) {
        resolve(nil);
    } else {
        reject(@"mute_mode_error", [NSString stringWithFormat:@"Failed to set mute mode: %ld", (long)result], nil);
    }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleGetMuteMode) {
    return @(self.audioDeviceModule.muteMode);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleSetAdvancedDuckingEnabled : (BOOL)enabled) {
    self.audioDeviceModule.advancedDuckingEnabled = enabled;
    return nil;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleIsAdvancedDuckingEnabled) {
    return @(self.audioDeviceModule.isAdvancedDuckingEnabled);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleSetDuckingLevel : (NSInteger)level) {
    self.audioDeviceModule.duckingLevel = level;
    return nil;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleGetDuckingLevel) {
    return @(self.audioDeviceModule.duckingLevel);
}

#pragma mark - Observer Delegate Response Methods

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleResolveEngineCreated : (NSInteger)result) {
    [self.audioDeviceModuleObserver resolveEngineCreatedWithResult:result];
    return nil;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleResolveWillEnableEngine : (NSInteger)result) {
    [self.audioDeviceModuleObserver resolveWillEnableEngineWithResult:result];
    return nil;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleResolveWillStartEngine : (NSInteger)result) {
    [self.audioDeviceModuleObserver resolveWillStartEngineWithResult:result];
    return nil;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleResolveDidStopEngine : (NSInteger)result) {
    [self.audioDeviceModuleObserver resolveDidStopEngineWithResult:result];
    return nil;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleResolveDidDisableEngine : (NSInteger)result) {
    [self.audioDeviceModuleObserver resolveDidDisableEngineWithResult:result];
    return nil;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioDeviceModuleResolveWillReleaseEngine : (NSInteger)result) {
    [self.audioDeviceModuleObserver resolveWillReleaseEngineWithResult:result];
    return nil;
}

@end
