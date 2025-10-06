import { NativeModules, Platform } from 'react-native';

const { WebRTCModule } = NativeModules;

export enum AudioEngineMuteMode {
  Unknown = -1,
  VoiceProcessing = 0,
  RestartEngine = 1,
  InputMixer = 2,
}

/**
 * Audio Device Module API for controlling audio devices and settings.
 * iOS/macOS only - will throw on Android.
 */
export class AudioDeviceModule {
    /**
   * Start audio playback
   */
    static async startPlayout(): Promise<{ success: boolean }> {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleStartPlayout();
    }

    /**
   * Stop audio playback
   */
    static async stopPlayout(): Promise<{ success: boolean }> {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleStopPlayout();
    }

    /**
   * Start audio recording
   */
    static async startRecording(): Promise<{ success: boolean }> {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleStartRecording();
    }

    /**
   * Stop audio recording
   */
    static async stopRecording(): Promise<{ success: boolean }> {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleStopRecording();
    }

    /**
   * Initialize and start local audio recording (calls initAndStartRecording)
   */
    static async startLocalRecording(): Promise<{ success: boolean }> {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleStartLocalRecording();
    }

    /**
   * Stop local audio recording
   */
    static async stopLocalRecording(): Promise<{ success: boolean }> {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleStopLocalRecording();
    }

    /**
   * Mute or unmute the microphone
   */
    static async setMicrophoneMuted(muted: boolean): Promise<{ success: boolean; muted: boolean }> {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleSetMicrophoneMuted(muted);
    }

    /**
   * Check if microphone is currently muted
   */
    static isMicrophoneMuted(): boolean {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleIsMicrophoneMuted();
    }

    /**
   * Enable or disable voice processing (requires engine restart)
   */
    static async setVoiceProcessingEnabled(enabled: boolean): Promise<{ success: boolean; enabled: boolean }> {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleSetVoiceProcessingEnabled(enabled);
    }

    /**
   * Check if voice processing is enabled
   */
    static isVoiceProcessingEnabled(): boolean {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleIsVoiceProcessingEnabled();
    }

    /**
   * Temporarily bypass voice processing without restarting the engine
   */
    static setVoiceProcessingBypassed(bypassed: boolean): void {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        WebRTCModule.audioDeviceModuleSetVoiceProcessingBypassed(bypassed);
    }

    /**
   * Check if voice processing is currently bypassed
   */
    static isVoiceProcessingBypassed(): boolean {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleIsVoiceProcessingBypassed();
    }

    /**
   * Enable or disable Automatic Gain Control (AGC)
   */
    static setVoiceProcessingAGCEnabled(enabled: boolean): { success: boolean; enabled: boolean } {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleSetVoiceProcessingAGCEnabled(enabled);
    }

    /**
   * Check if AGC is enabled
   */
    static isVoiceProcessingAGCEnabled(): boolean {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleIsVoiceProcessingAGCEnabled();
    }

    /**
   * Check if audio is currently playing
   */
    static isPlaying(): boolean {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleIsPlaying();
    }

    /**
   * Check if audio is currently recording
   */
    static isRecording(): boolean {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleIsRecording();
    }

    /**
   * Check if the audio engine is running
   */
    static isEngineRunning(): boolean {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleIsEngineRunning();
    }

    /**
   * Set the microphone mute mode
   */
    static async setMuteMode(mode: AudioEngineMuteMode): Promise<{ success: boolean; mode: AudioEngineMuteMode }> {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleSetMuteMode(mode);
    }

    /**
   * Get the current mute mode
   */
    static getMuteMode(): AudioEngineMuteMode {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleGetMuteMode();
    }

    /**
   * Enable or disable advanced audio ducking
   */
    static setAdvancedDuckingEnabled(enabled: boolean): { success: boolean; enabled: boolean } {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleSetAdvancedDuckingEnabled(enabled);
    }

    /**
   * Check if advanced ducking is enabled
   */
    static isAdvancedDuckingEnabled(): boolean {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleIsAdvancedDuckingEnabled();
    }

    /**
   * Set the audio ducking level (0-100)
   */
    static setDuckingLevel(level: number): { success: boolean; level: number } {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleSetDuckingLevel(level);
    }

    /**
   * Get the current ducking level
   */
    static getDuckingLevel(): number {
        if (Platform.OS === 'android') {
            throw new Error('AudioDeviceModule is only available on iOS/macOS');
        }

        return WebRTCModule.audioDeviceModuleGetDuckingLevel();
    }
}
