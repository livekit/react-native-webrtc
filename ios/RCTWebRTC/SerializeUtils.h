#import <LiveKitWebRTC/RTCMediaStreamTrack.h>
#import <LiveKitWebRTC/RTCPeerConnectionFactory.h>
#import <LiveKitWebRTC/RTCRtpReceiver.h>
#import <LiveKitWebRTC/RTCRtpTransceiver.h>
#import <LiveKitWebRTC/RTCVideoCodecInfo.h>
#import "WebRTCModule+RTCPeerConnection.h"

@interface SerializeUtils : NSObject

+ (NSString *_Nonnull)transceiverToJSONWithPeerConnectionId:(nonnull NSNumber *)id
                                                transceiver:(LKRTCRtpTransceiver *_Nonnull)transceiver;
+ (NSDictionary *_Nonnull)senderToJSONWithPeerConnectionId:(nonnull NSNumber *)id sender:(LKRTCRtpSender *_Nonnull)sender;
+ (NSDictionary *_Nonnull)receiverToJSONWithPeerConnectionId:(nonnull NSNumber *)id
                                                    receiver:(LKRTCRtpReceiver *_Nonnull)receiver;
+ (NSDictionary *_Nonnull)trackToJSONWithPeerConnectionId:(nonnull NSNumber *)id
                                                    track:(LKRTCMediaStreamTrack *_Nonnull)track;
+ (NSDictionary *_Nonnull)capabilitiesToJSON:(LKRTCRtpCapabilities *_Nonnull)capabilities;
+ (NSDictionary *_Nonnull)codecCapabilityToJSON:(LKRTCRtpCodecCapability *_Nonnull)codec;
+ (NSString *_Nonnull)serializeDirection:(LKRTCRtpTransceiverDirection)direction;
+ (LKRTCRtpTransceiverDirection)parseDirection:(NSString *_Nonnull)direction;
+ (LKRTCRtpTransceiverInit *_Nonnull)parseTransceiverOptions:(NSDictionary *_Nonnull)parameters;
+ (NSDictionary *_Nonnull)parametersToJSON:(LKRTCRtpParameters *_Nonnull)parameters;
+ (NSMutableArray *_Nonnull)constructTransceiversInfoArrayWithPeerConnection:
    (LKRTCPeerConnection *_Nonnull)peerConnection;
+ (NSDictionary *_Nonnull)streamToJSONWithPeerConnectionId:(NSNumber *_Nonnull)id
                                                    stream:(LKRTCMediaStream *_Nonnull)stream
                                            streamReactTag:(NSString *_Nonnull)streamReactTag;
@end
