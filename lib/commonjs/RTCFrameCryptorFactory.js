"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RTCFrameCryptorAlgorithm = void 0;
var base64 = _interopRequireWildcard(require("base64-js"));
var _reactNative = require("react-native");
var _RTCFrameCryptor = _interopRequireDefault(require("./RTCFrameCryptor"));
var _RTCKeyProvider = _interopRequireDefault(require("./RTCKeyProvider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  WebRTCModule
} = _reactNative.NativeModules;
let RTCFrameCryptorAlgorithm; // kAesCbc = 1,
exports.RTCFrameCryptorAlgorithm = RTCFrameCryptorAlgorithm;
(function (RTCFrameCryptorAlgorithm) {
  RTCFrameCryptorAlgorithm[RTCFrameCryptorAlgorithm["kAesGcm"] = 0] = "kAesGcm";
})(RTCFrameCryptorAlgorithm || (exports.RTCFrameCryptorAlgorithm = RTCFrameCryptorAlgorithm = {}));
class RTCFrameCryptorFactory {
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
    return new _RTCFrameCryptor.default(result, participantId);
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
    return new _RTCFrameCryptor.default(result, participantId);
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
    return new _RTCKeyProvider.default(result);
  }
}
exports.default = RTCFrameCryptorFactory;
//# sourceMappingURL=RTCFrameCryptorFactory.js.map