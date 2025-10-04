#import <AVFoundation/AVFoundation.h>
#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>
#import <React/RCTEventEmitter.h>

#import <WebRTC/WebRTC.h>

static NSString *const kEventPeerConnectionSignalingStateChanged = @"peerConnectionSignalingStateChanged";
static NSString *const kEventPeerConnectionStateChanged = @"peerConnectionStateChanged";
static NSString *const kEventPeerConnectionOnRenegotiationNeeded = @"peerConnectionOnRenegotiationNeeded";
static NSString *const kEventPeerConnectionIceConnectionChanged = @"peerConnectionIceConnectionChanged";
static NSString *const kEventPeerConnectionIceGatheringChanged = @"peerConnectionIceGatheringChanged";
static NSString *const kEventPeerConnectionGotICECandidate = @"peerConnectionGotICECandidate";
static NSString *const kEventPeerConnectionDidOpenDataChannel = @"peerConnectionDidOpenDataChannel";
static NSString *const kEventDataChannelDidChangeBufferedAmount = @"dataChannelDidChangeBufferedAmount";
static NSString *const kEventDataChannelStateChanged = @"dataChannelStateChanged";
static NSString *const kEventDataChannelReceiveMessage = @"dataChannelReceiveMessage";
static NSString *const kEventMediaStreamTrackMuteChanged = @"mediaStreamTrackMuteChanged";
static NSString *const kEventMediaStreamTrackEnded = @"mediaStreamTrackEnded";
static NSString *const kEventPeerConnectionOnRemoveTrack = @"peerConnectionOnRemoveTrack";
static NSString *const kEventPeerConnectionOnTrack = @"peerConnectionOnTrack";
static NSString *const kEventFrameCryptionStateChanged = @"frameCryptionStateChanged";
static NSString *const kEventAudioDeviceModuleSpeechActivity = @"audioDeviceModuleSpeechActivity";
static NSString *const kEventAudioDeviceModuleEngineCreated = @"audioDeviceModuleEngineCreated";
static NSString *const kEventAudioDeviceModuleEngineWillEnable = @"audioDeviceModuleEngineWillEnable";
static NSString *const kEventAudioDeviceModuleEngineWillStart = @"audioDeviceModuleEngineWillStart";
static NSString *const kEventAudioDeviceModuleEngineDidStop = @"audioDeviceModuleEngineDidStop";
static NSString *const kEventAudioDeviceModuleEngineDidDisable = @"audioDeviceModuleEngineDidDisable";
static NSString *const kEventAudioDeviceModuleEngineWillRelease = @"audioDeviceModuleEngineWillRelease";
static NSString *const kEventAudioDeviceModuleDevicesUpdated = @"audioDeviceModuleDevicesUpdated";

@class AudioDeviceModuleObserver;

@interface WebRTCModule : RCTEventEmitter<RCTBridgeModule>

@property(nonatomic, strong) dispatch_queue_t workerQueue;

@property(nonatomic, strong) RTCPeerConnectionFactory *peerConnectionFactory;
@property(nonatomic, strong) id<RTCVideoDecoderFactory> decoderFactory;
@property(nonatomic, strong) id<RTCVideoEncoderFactory> encoderFactory;

@property(nonatomic, strong) NSMutableDictionary<NSNumber *, RTCPeerConnection *> *peerConnections;
@property(nonatomic, strong) NSMutableDictionary<NSString *, RTCMediaStream *> *localStreams;
@property(nonatomic, strong) NSMutableDictionary<NSString *, RTCMediaStreamTrack *> *localTracks;

@property(nonatomic, strong) NSMutableDictionary<NSString *, RTCFrameCryptor *> *frameCryptors;
@property(nonatomic, strong) NSMutableDictionary<NSString *, RTCFrameCryptorKeyProvider *> *keyProviders;
@property(nonatomic, strong) NSMutableDictionary<NSString *, RTCDataPacketCryptor *> *dataPacketCryptors;

@property(nonatomic, readonly) RTCAudioDeviceModule *audioDeviceModule;
@property(nonatomic, strong) AudioDeviceModuleObserver *audioDeviceModuleObserver;

- (RTCMediaStream *)streamForReactTag:(NSString *)reactTag;

@end
