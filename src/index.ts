import { NativeModules, Platform } from 'react-native'
const { WebRTCModule } = NativeModules

if (WebRTCModule === null) {
  throw new Error(
    `WebRTC native module not found.\n${
      Platform.OS === 'ios'
        ? 'Try executing the "pod install" command inside your projects ios folder.'
        : 'Try executing the "npm install" command inside your projects folder.'
    }`,
  )
}

import {
  getDefaultAudioDeviceId,
  setDefaultAudioDeviceId,
} from './AudioDeviceModule'
import { setupNativeEvents } from './EventEmitter'
import Logger from './Logger'
import mediaDevices from './MediaDevices'
import MediaStream from './MediaStream'
import MediaStreamTrack, { type MediaTrackSettings } from './MediaStreamTrack'
import MediaStreamTrackEvent from './MediaStreamTrackEvent'
import permissions from './Permissions'
import RTCAudioSession from './RTCAudioSession'
import RTCErrorEvent from './RTCErrorEvent'
import RTCFrameCryptor, { RTCFrameCryptorState } from './RTCFrameCryptor'
import RTCFrameCryptorFactory, {
  RTCFrameCryptorAlgorithm,
  RTCKeyProviderOptions,
} from './RTCFrameCryptorFactory'
import RTCIceCandidate from './RTCIceCandidate'
import RTCKeyProvider from './RTCKeyProvider'
import RTCPIPView, { startIOSPIP, stopIOSPIP } from './RTCPIPView'
import RTCPeerConnection from './RTCPeerConnection'
import RTCRtpReceiver from './RTCRtpReceiver'
import RTCRtpSender from './RTCRtpSender'
import RTCRtpTransceiver from './RTCRtpTransceiver'
import RTCSessionDescription from './RTCSessionDescription'
import RTCView, {
  type RTCIOSPIPOptions,
  type RTCVideoViewProps,
} from './RTCView'
import ScreenCapturePickerView from './ScreenCapturePickerView'

Logger.enable(`${Logger.ROOT_PREFIX}:*`)

// Add listeners for the native events early, since they are added asynchronously.
setupNativeEvents()

export {
  // Audio device management
  getDefaultAudioDeviceId,
  mediaDevices,
  MediaStream,
  MediaStreamTrack,
  permissions,
  registerGlobals,
  RTCAudioSession,
  RTCErrorEvent,
  RTCFrameCryptor,
  RTCFrameCryptorAlgorithm,
  RTCFrameCryptorFactory,
  RTCFrameCryptorState,
  RTCIceCandidate,
  RTCKeyProvider,
  RTCKeyProviderOptions,
  RTCPeerConnection,
  RTCPIPView,
  RTCRtpReceiver,
  RTCRtpSender,
  RTCRtpTransceiver,
  RTCSessionDescription,
  RTCView,
  ScreenCapturePickerView,
  setDefaultAudioDeviceId,
  startIOSPIP,
  stopIOSPIP,
  type MediaTrackSettings,
  type RTCIOSPIPOptions,
  type RTCVideoViewProps,
}

declare const global: any

function registerGlobals(): void {
  // Should not happen. React Native has a global navigator object.
  if (typeof global.navigator !== 'object') {
    throw new Error('navigator is not an object')
  }

  if (!global.navigator.mediaDevices) {
    global.navigator.mediaDevices = {}
  }

  global.navigator.mediaDevices.getUserMedia =
    mediaDevices.getUserMedia.bind(mediaDevices)
  global.navigator.mediaDevices.getDisplayMedia =
    mediaDevices.getDisplayMedia.bind(mediaDevices)
  global.navigator.mediaDevices.enumerateDevices =
    mediaDevices.enumerateDevices.bind(mediaDevices)

  global.RTCIceCandidate = RTCIceCandidate
  global.RTCPeerConnection = RTCPeerConnection
  global.RTCRtpReceiver = RTCRtpReceiver
  global.RTCRtpSender = RTCRtpReceiver
  global.RTCSessionDescription = RTCSessionDescription
  global.MediaStream = MediaStream
  global.MediaStreamTrack = MediaStreamTrack
  global.MediaStreamTrackEvent = MediaStreamTrackEvent
  global.RTCRtpTransceiver = RTCRtpTransceiver
  global.RTCRtpReceiver = RTCRtpReceiver
  global.RTCRtpSender = RTCRtpSender
  global.RTCErrorEvent = RTCErrorEvent
}
