#if !TARGET_OS_TV

#import "LKRNCaptureController.h"

@implementation LKRNCaptureController

- (void)startCapture {
    // subclasses needs to override
}

- (void)stopCapture {
    // subclasses needs to override
}

- (NSDictionary *)getSettings {
    // subclasses needs to override
    return @{@"deviceId" : self.deviceId};
}

- (void)applyConstraints:(NSDictionary *)constraints error:(NSError **)outError {
    *outError =
        [NSError errorWithDomain:@"react-native-webrtc"
                            code:0
                        userInfo:@{NSLocalizedDescriptionKey : @"This video track does not support applyConstraints."}];
}

@end

#endif