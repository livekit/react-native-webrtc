#import <Foundation/Foundation.h>
#import "LKRNCaptureController.h"
#import "LKRNCapturerEventsDelegate.h"

NS_ASSUME_NONNULL_BEGIN

@class LKRNScreenCapturer;

@interface LKRNScreenCaptureController : LKRNCaptureController

- (instancetype)initWithCapturer:(nonnull LKRNScreenCapturer *)capturer;
- (void)startCapture;
- (void)stopCapture;

@end

NS_ASSUME_NONNULL_END
