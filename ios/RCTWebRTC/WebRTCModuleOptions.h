#import <Foundation/Foundation.h>
#import <LiveKitWebRTC/LiveKitWebRTC.h>

NS_ASSUME_NONNULL_BEGIN

@interface WebRTCModuleOptions : NSObject

@property(nonatomic, strong, nullable) id<LKRTCVideoDecoderFactory> videoDecoderFactory;
@property(nonatomic, strong, nullable) id<LKRTCVideoEncoderFactory> videoEncoderFactory;
@property(nonatomic, strong, nullable) id<LKRTCAudioDevice> audioDevice;
@property(nonatomic, strong, nullable) id<LKRTCAudioProcessingModule> audioProcessingModule;
@property(nonatomic, strong, nullable) NSDictionary *fieldTrials;
@property(nonatomic, assign) LKRTCLoggingSeverity loggingSeverity;
@property(nonatomic, assign) BOOL enableMultitaskingCameraAccess;

@property(nonatomic, assign) double defaultTrackVolume;

#pragma mark - This class is a singleton

+ (instancetype _Nonnull)sharedInstance;

@end

NS_ASSUME_NONNULL_END
