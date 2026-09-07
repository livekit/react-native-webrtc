#import <React/RCTConvert.h>
#import <LiveKitWebRTC/RTCConfiguration.h>
#import <LiveKitWebRTC/RTCDataChannelConfiguration.h>
#import <LiveKitWebRTC/RTCIceCandidate.h>
#import <LiveKitWebRTC/RTCIceServer.h>
#import <LiveKitWebRTC/RTCSessionDescription.h>

@interface RCTConvert (WebRTC)

+ (LKRTCIceCandidate *)LKRTCIceCandidate:(id)json;
+ (LKRTCSessionDescription *)LKRTCSessionDescription:(id)json;
+ (LKRTCIceServer *)LKRTCIceServer:(id)json;
+ (LKRTCDataChannelConfiguration *)LKRTCDataChannelConfiguration:(id)json;
+ (LKRTCConfiguration *)LKRTCConfiguration:(id)json;

@end
