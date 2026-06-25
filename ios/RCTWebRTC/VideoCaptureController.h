#if !TARGET_OS_TV

#import <Foundation/Foundation.h>
#import <LiveKitWebRTC/RTCCameraVideoCapturer.h>

#import "CaptureController.h"

@interface VideoCaptureController : CaptureController
@property(nonatomic, readonly, strong) LKRTCCameraVideoCapturer *capturer;
@property(nonatomic, readonly, strong) AVCaptureDeviceFormat *selectedFormat;
@property(nonatomic, readonly, assign) int frameRate;
@property(nonatomic, assign) BOOL enableMultitaskingCameraAccess;

- (instancetype)initWithCapturer:(LKRTCCameraVideoCapturer *)capturer andConstraints:(NSDictionary *)constraints;
- (void)startCapture;
- (void)stopCapture;
- (void)switchCamera;
- (void)applyConstraints:(NSDictionary *)constraints error:(NSError **)outError;

@end
#endif
