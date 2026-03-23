import { Event, EventTarget } from 'event-target-shim/index';
declare type FRAME_CRYPTOR_EVENTS = 'onframecryptorstatechanged';
interface IRTCDataChannelEventInitDict extends Event.EventInit {
    frameCryptor: RTCFrameCryptor;
    state: RTCFrameCryptorState;
}
/**
 * @eventClass
 * This event is fired whenever the RTCDataChannel has changed in any way.
 * @param {FRAME_CRYPTOR_EVENTS} type - The type of event.
 * @param {IRTCDataChannelEventInitDict} eventInitDict - The event init properties.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel#events MDN} for details.
 */
export declare class RTCFrameCryptorStateEvent<TEventType extends FRAME_CRYPTOR_EVENTS> extends Event<TEventType> {
    /** @eventProperty */
    frameCryptor: RTCFrameCryptor;
    /** @eventProperty */
    state: RTCFrameCryptorState;
    constructor(type: TEventType, eventInitDict: IRTCDataChannelEventInitDict);
}
declare type RTCFrameCryptorEventMap = {
    onframecryptorstatechanged: RTCFrameCryptorStateEvent<'onframecryptorstatechanged'>;
};
export declare enum RTCFrameCryptorState {
    FrameCryptorStateNew = 0,
    FrameCryptorStateOk = 1,
    FrameCryptorStateEncryptionFailed = 2,
    FrameCryptorStateDecryptionFailed = 3,
    FrameCryptorStateMissingKey = 4,
    FrameCryptorStateKeyRatcheted = 5,
    FrameCryptorStateInternalError = 6
}
export default class RTCFrameCryptor extends EventTarget<RTCFrameCryptorEventMap> {
    private _frameCryptorId;
    private _participantId;
    constructor(frameCryptorId: string, participantId: string);
    get id(): string;
    get participantId(): string;
    _cryptorStateFromString(str: string): RTCFrameCryptorState;
    setKeyIndex(keyIndex: number): Promise<boolean>;
    getKeyIndex(): Promise<number>;
    setEnabled(enabled: boolean): Promise<boolean>;
    getEnabled(): Promise<boolean>;
    dispose(): Promise<void>;
    _registerEvents(): void;
}
export {};
