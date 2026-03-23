export declare enum FrameCryptorState {
    FrameCryptorStateNew = 0,
    FrameCryptorStateOk = 1,
    FrameCryptorStateEncryptionFailed = 2,
    FrameCryptorStateDecryptionFailed = 3,
    FrameCryptorStateMissingKey = 4,
    FrameCryptorStateKeyRatcheted = 5,
    FrameCryptorStateInternalError = 6
}
export default class RTCKeyProvider {
    _id: string;
    constructor(keyProviderId: string);
    setSharedKey(key: string | Uint8Array, keyIndex?: number): Promise<any>;
    ratchetSharedKey(keyIndex?: number): Promise<Uint8Array>;
    exportSharedKey(keyIndex?: number): Promise<Uint8Array>;
    setKey(participantId: string, key: string | Uint8Array, keyIndex?: number): Promise<boolean>;
    ratchetKey(participantId: string, keyIndex?: number): Promise<Uint8Array>;
    exportKey(participantId: string, keyIndex?: number): Promise<Uint8Array>;
    setSifTrailer(trailer: Uint8Array): Promise<any>;
    dispose(): Promise<any>;
}
