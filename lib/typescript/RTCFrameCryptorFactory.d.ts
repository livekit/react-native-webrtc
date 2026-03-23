import RTCFrameCryptor from './RTCFrameCryptor';
import RTCKeyProvider from './RTCKeyProvider';
import RTCRtpReceiver from './RTCRtpReceiver';
import RTCRtpSender from './RTCRtpSender';
export declare enum RTCFrameCryptorAlgorithm {
    kAesGcm = 0
}
export declare type RTCKeyProviderOptions = {
    sharedKey: boolean;
    ratchetSalt: string | Uint8Array;
    ratchetWindowSize: number;
    uncryptedMagicBytes?: Uint8Array;
    failureTolerance?: number;
    keyRingSize?: number;
    discardFrameWhenCryptorNotReady?: boolean;
};
export default class RTCFrameCryptorFactory {
    static createFrameCryptorForRtpSender(participantId: string, sender: RTCRtpSender, algorithm: RTCFrameCryptorAlgorithm, keyProvider: RTCKeyProvider): RTCFrameCryptor;
    static createFrameCryptorForRtpReceiver(participantId: string, receiver: RTCRtpReceiver, algorithm: RTCFrameCryptorAlgorithm, keyProvider: RTCKeyProvider): RTCFrameCryptor;
    static createDefaultKeyProvider(options: RTCKeyProviderOptions): RTCKeyProvider;
}
