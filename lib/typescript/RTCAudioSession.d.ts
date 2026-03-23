export default class RTCAudioSession {
    /**
     * To be called when CallKit activates the audio session.
     */
    static audioSessionDidActivate(): void;
    /**
     * To be called when CallKit deactivates the audio session.
     */
    static audioSessionDidDeactivate(): void;
}
