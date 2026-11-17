#if TARGET_OS_IOS

#import "LKRNScreenCaptureController.h"
#import "LKRNScreenCapturer.h"
#import "LKRNSocketConnection.h"

static NSString *const kRTCScreensharingSocketFD = @"rtc_SSFD";
static NSString *const kRTCAppGroupIdentifier = @"RTCAppGroupIdentifier";

@interface LKRNScreenCaptureController ()

@property(nonatomic, retain) LKRNScreenCapturer *capturer;

@end

@interface LKRNScreenCaptureController (LKRNCapturerEventsDelegate)<LKRNCapturerEventsDelegate>
- (void)capturerDidEnd:(LKRTCVideoCapturer *)capturer;
@end

@interface LKRNScreenCaptureController (Private)

@property(nonatomic, readonly) NSString *appGroupIdentifier;

@end

@implementation LKRNScreenCaptureController

- (instancetype)initWithCapturer:(nonnull LKRNScreenCapturer *)capturer {
    self = [super init];
    if (self) {
        self.capturer = capturer;
        self.deviceId = @"screen-capture";
    }

    return self;
}

- (void)dealloc {
    [self.capturer stopCapture];
}

- (void)startCapture {
    if (!self.appGroupIdentifier) {
        return;
    }

    self.capturer.eventsDelegate = self;
    NSString *socketFilePath = [self filePathForApplicationGroupIdentifier:self.appGroupIdentifier];
    LKRNSocketConnection *connection = [[LKRNSocketConnection alloc] initWithFilePath:socketFilePath];
    [self.capturer startCaptureWithConnection:connection];
}

- (void)stopCapture {
    [self.capturer stopCapture];
}

- (NSDictionary *)getSettings {
    return @{@"deviceId" : self.deviceId, @"groupId" : @"", @"frameRate" : @(30)};
}
// MARK: LKRNCapturerEventsDelegate Methods

- (void)capturerDidEnd:(LKRTCVideoCapturer *)capturer {
    [self.eventsDelegate capturerDidEnd:capturer];
}

// MARK: Private Methods

- (NSString *)appGroupIdentifier {
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    return infoDictionary[kRTCAppGroupIdentifier];
}

- (NSString *)filePathForApplicationGroupIdentifier:(nonnull NSString *)identifier {
    NSURL *sharedContainer =
        [[NSFileManager defaultManager] containerURLForSecurityApplicationGroupIdentifier:identifier];
    NSString *socketFilePath = [[sharedContainer URLByAppendingPathComponent:kRTCScreensharingSocketFD] path];

    return socketFilePath;
}

@end

#endif