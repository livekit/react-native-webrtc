import * as base64 from 'base64-js';
import { NativeModules } from 'react-native';
import RTCFrameCryptor from './RTCFrameCryptor';
import RTCKeyProvider from './RTCKeyProvider';
const {
  WebRTCModule
} = NativeModules;
export let RTCFrameCryptorAlgorithm; // kAesCbc = 1,
(function (RTCFrameCryptorAlgorithm) {
  RTCFrameCryptorAlgorithm[RTCFrameCryptorAlgorithm["kAesGcm"] = 0] = "kAesGcm";
})(RTCFrameCryptorAlgorithm || (RTCFrameCryptorAlgorithm = {}));
export default class RTCFrameCryptorFactory {
  static createFrameCryptorForRtpSender(participantId, sender, algorithm, keyProvider) {
    const params = {
      'peerConnectionId': sender._peerConnectionId,
      'rtpSenderId': sender._id,
      participantId,
      'keyProviderId': keyProvider._id,
      'type': 'sender',
      'algorithm': algorithm
    };
    const result = WebRTCModule.frameCryptorFactoryCreateFrameCryptor(params);
    if (!result) {
      throw new Error('Error when creating frame cryptor for sender');
    }
    return new RTCFrameCryptor(result, participantId);
  }
  static createFrameCryptorForRtpReceiver(participantId, receiver, algorithm, keyProvider) {
    const params = {
      'peerConnectionId': receiver._peerConnectionId,
      'rtpReceiverId': receiver._id,
      participantId,
      'keyProviderId': keyProvider._id,
      'type': 'receiver',
      'algorithm': algorithm
    };
    const result = WebRTCModule.frameCryptorFactoryCreateFrameCryptor(params);
    if (!result) {
      throw new Error('Error when creating frame cryptor for receiver');
    }
    return new RTCFrameCryptor(result, participantId);
  }
  static createDefaultKeyProvider(options) {
    var _options$failureToler, _options$keyRingSize, _options$discardFrame;
    const params = {
      'sharedKey': options.sharedKey,
      'ratchetWindowSize': options.ratchetWindowSize,
      'failureTolerance': (_options$failureToler = options.failureTolerance) !== null && _options$failureToler !== void 0 ? _options$failureToler : -1,
      'keyRingSize': (_options$keyRingSize = options.keyRingSize) !== null && _options$keyRingSize !== void 0 ? _options$keyRingSize : 16,
      'discardFrameWhenCryptorNotReady': (_options$discardFrame = options.discardFrameWhenCryptorNotReady) !== null && _options$discardFrame !== void 0 ? _options$discardFrame : false
    };
    if (typeof options.ratchetSalt === 'string') {
      params['ratchetSalt'] = options.ratchetSalt;
      params['ratchetSaltIsBase64'] = false;
    } else {
      const bytes = options.ratchetSalt;
      params['ratchetSalt'] = base64.fromByteArray(bytes);
      params['ratchetSaltIsBase64'] = true;
    }
    if (options.uncryptedMagicBytes) {
      params['uncryptedMagicBytes'] = base64.fromByteArray(options.uncryptedMagicBytes);
    }
    const result = WebRTCModule.frameCryptorFactoryCreateKeyProvider(params);
    if (!result) {
      throw new Error('Error when creating key provider!');
    }
    return new RTCKeyProvider(result);
  }
}
//# sourceMappingURL=RTCFrameCryptorFactory.js.map