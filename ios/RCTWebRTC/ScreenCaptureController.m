#if TARGET_OS_IOS

#import "ScreenCaptureController.h"
#import "ScreenCapturer.h"
#import "SocketConnection.h"

NSString *const kLKRTCScreensharingSocketFD = @"rtc_SSFD";
NSString *const kLKRTCAppGroupIdentifier = @"LKRTCAppGroupIdentifier";

@interface ScreenCaptureController ()

@property(nonatomic, retain) ScreenCapturer *capturer;

@end

@interface ScreenCaptureController (CapturerEventsDelegate)<CapturerEventsDelegate>
- (void)capturerDidEnd:(LKRTCVideoCapturer *)capturer;
@end

@interface ScreenCaptureController (Private)

@property(nonatomic, readonly) NSString *appGroupIdentifier;

@end

@implementation ScreenCaptureController

- (instancetype)initWithCapturer:(nonnull ScreenCapturer *)capturer {
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
    SocketConnection *connection = [[SocketConnection alloc] initWithFilePath:socketFilePath];
    [self.capturer startCaptureWithConnection:connection];
}

- (void)stopCapture {
    [self.capturer stopCapture];
}

- (NSDictionary *)getSettings {
    return @{@"deviceId" : self.deviceId, @"groupId" : @"", @"frameRate" : @(30)};
}
// MARK: CapturerEventsDelegate Methods

- (void)capturerDidEnd:(LKRTCVideoCapturer *)capturer {
    [self.eventsDelegate capturerDidEnd:capturer];
}

// MARK: Private Methods

- (NSString *)appGroupIdentifier {
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    return infoDictionary[kLKRTCAppGroupIdentifier];
}

- (NSString *)filePathForApplicationGroupIdentifier:(nonnull NSString *)identifier {
    NSURL *sharedContainer =
        [[NSFileManager defaultManager] containerURLForSecurityApplicationGroupIdentifier:identifier];
    NSString *socketFilePath = [[sharedContainer URLByAppendingPathComponent:kLKRTCScreensharingSocketFD] path];

    return socketFilePath;
}

@end

#endif