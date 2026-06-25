#import <objc/runtime.h>

#import <React/RCTBridge.h>
#import <React/RCTBridgeModule.h>

#import "WebRTCModule.h"

@implementation WebRTCModule (LKRTCAudioSession)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioSessionDidActivate) {
    [[LKRTCAudioSession sharedInstance] audioSessionDidActivate:[AVAudioSession sharedInstance]];
    return nil;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(audioSessionDidDeactivate) {
    [[LKRTCAudioSession sharedInstance] audioSessionDidDeactivate:[AVAudioSession sharedInstance]];
    return nil;
}

@end
