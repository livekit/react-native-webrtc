#import <objc/runtime.h>

#import "LKRNCaptureController.h"
#import "RTCMediaStreamTrack+React.h"

@implementation LKRTCMediaStreamTrack (React)

- (LKRNCaptureController *)captureController {
    return objc_getAssociatedObject(self, @selector(captureController));
}

- (void)setCaptureController:(LKRNCaptureController *)captureController {
    objc_setAssociatedObject(self, @selector(captureController), captureController, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

@end
