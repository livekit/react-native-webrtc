import { NativeModules } from 'react-native'
const { WebRTCModule } = NativeModules

/**
 * Set the default audio device ID to use when no specific device is requested.
 * This allows applications to control which audio device is used by default.
 *
 * @param deviceId - The device ID to use as default (e.g., "audio-1", "expo-av-audio", etc.)
 */
export function setDefaultAudioDeviceId(deviceId: string): void {
  if (typeof deviceId !== 'string' || !deviceId.trim()) {
    throw new TypeError('deviceId must be a non-empty string')
  }

  WebRTCModule.setDefaultAudioDeviceId(deviceId)
}

/**
 * Get the current default audio device ID.
 *
 * @returns A promise that resolves to the current default audio device ID
 */
export function getDefaultAudioDeviceId(): Promise<string> {
  return WebRTCModule.getDefaultAudioDeviceId()
}
