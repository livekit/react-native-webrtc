import { EventTarget, Event } from 'event-target-shim/index';
import { MediaTrackConstraints } from './Constraints';
declare type MediaStreamTrackState = 'live' | 'ended';
export declare type MediaStreamTrackInfo = {
    id: string;
    kind: string;
    remote: boolean;
    constraints: object;
    enabled: boolean;
    settings: object;
    peerConnectionId: number;
    readyState: MediaStreamTrackState;
};
export declare type MediaTrackSettings = {
    width?: number;
    height?: number;
    frameRate?: number;
    facingMode?: string;
    deviceId?: string;
    groupId?: string;
};
declare type MediaStreamTrackEventMap = {
    ended: Event<'ended'>;
    mute: Event<'mute'>;
    unmute: Event<'unmute'>;
};
export default class MediaStreamTrack extends EventTarget<MediaStreamTrackEventMap> {
    _constraints: MediaTrackConstraints;
    _enabled: boolean;
    _settings: MediaTrackSettings;
    _muted: boolean;
    _peerConnectionId: number;
    _readyState: MediaStreamTrackState;
    readonly id: string;
    readonly kind: string;
    readonly label: string;
    readonly remote: boolean;
    constructor(info: MediaStreamTrackInfo);
    get enabled(): boolean;
    set enabled(enabled: boolean);
    get muted(): boolean;
    get readyState(): string;
    stop(): void;
    /**
     * Private / custom API for switching the cameras on the fly, without the
     * need for adding / removing tracks or doing any SDP renegotiation.
     *
     * This is how the reference application (AppRTCMobile) implements camera
     * switching.
     *
     * @deprecated Use applyConstraints instead.
     */
    _switchCamera(): void;
    _setVideoEffects(names: string[]): void;
    _setVideoEffect(name: string): void;
    /**
     * Internal function which is used to set the muted state on remote tracks and
     * emit the mute / unmute event.
     *
     * @param muted Whether the track should be marked as muted / unmuted.
     */
    _setMutedInternal(muted: boolean): void;
    /**
     * Custom API for setting the volume on an individual audio track.
     *
     * @param volume a gain value in the range of 0-10. defaults to 1.0
     */
    _setVolume(volume: number): void;
    /**
     * Applies a new set of constraints to the track.
     *
     * @param constraints An object listing the constraints
     * to apply to the track's constrainable properties; any existing
     * constraints are replaced with the new values specified, and any
     * constrainable properties not included are restored to their default
     * constraints. If this parameter is omitted, all currently set custom
     * constraints are cleared.
     */
    applyConstraints(constraints?: MediaTrackConstraints): Promise<void>;
    clone(): never;
    getCapabilities(): never;
    getConstraints(): MediaTrackConstraints;
    getSettings(): MediaTrackSettings;
    _registerEvents(): void;
    release(): void;
}
export {};
