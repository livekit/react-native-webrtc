#import <AVFoundation/AVFoundation.h>
#import <LiveKitWebRTC/RTCVideoCapturer.h>
#import "LKRNCapturerEventsDelegate.h"

NS_ASSUME_NONNULL_BEGIN

@class LKRNSocketConnection;

@interface LKRNScreenCapturer : LKRTCVideoCapturer

@property(nonatomic, weak) id<LKRNCapturerEventsDelegate> eventsDelegate;

- (instancetype)initWithDelegate:(__weak id<LKRTCVideoCapturerDelegate>)delegate;
- (void)startCaptureWithConnection:(nonnull LKRNSocketConnection *)connection;
- (void)stopCapture;

@end

NS_ASSUME_NONNULL_END
