"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MediaStream", {
  enumerable: true,
  get: function () {
    return _MediaStream.default;
  }
});
Object.defineProperty(exports, "MediaStreamTrack", {
  enumerable: true,
  get: function () {
    return _MediaStreamTrack.default;
  }
});
Object.defineProperty(exports, "RTCAudioSession", {
  enumerable: true,
  get: function () {
    return _RTCAudioSession.default;
  }
});
Object.defineProperty(exports, "RTCErrorEvent", {
  enumerable: true,
  get: function () {
    return _RTCErrorEvent.default;
  }
});
Object.defineProperty(exports, "RTCFrameCryptor", {
  enumerable: true,
  get: function () {
    return _RTCFrameCryptor.default;
  }
});
Object.defineProperty(exports, "RTCFrameCryptorAlgorithm", {
  enumerable: true,
  get: function () {
    return _RTCFrameCryptorFactory.RTCFrameCryptorAlgorithm;
  }
});
Object.defineProperty(exports, "RTCFrameCryptorFactory", {
  enumerable: true,
  get: function () {
    return _RTCFrameCryptorFactory.default;
  }
});
Object.defineProperty(exports, "RTCFrameCryptorState", {
  enumerable: true,
  get: function () {
    return _RTCFrameCryptor.RTCFrameCryptorState;
  }
});
Object.defineProperty(exports, "RTCIceCandidate", {
  enumerable: true,
  get: function () {
    return _RTCIceCandidate.default;
  }
});
Object.defineProperty(exports, "RTCKeyProvider", {
  enumerable: true,
  get: function () {
    return _RTCKeyProvider.default;
  }
});
Object.defineProperty(exports, "RTCKeyProviderOptions", {
  enumerable: true,
  get: function () {
    return _RTCFrameCryptorFactory.RTCKeyProviderOptions;
  }
});
Object.defineProperty(exports, "RTCPIPView", {
  enumerable: true,
  get: function () {
    return _RTCPIPView.default;
  }
});
Object.defineProperty(exports, "RTCPeerConnection", {
  enumerable: true,
  get: function () {
    return _RTCPeerConnection.default;
  }
});
Object.defineProperty(exports, "RTCRtpReceiver", {
  enumerable: true,
  get: function () {
    return _RTCRtpReceiver.default;
  }
});
Object.defineProperty(exports, "RTCRtpSender", {
  enumerable: true,
  get: function () {
    return _RTCRtpSender.default;
  }
});
Object.defineProperty(exports, "RTCRtpTransceiver", {
  enumerable: true,
  get: function () {
    return _RTCRtpTransceiver.default;
  }
});
Object.defineProperty(exports, "RTCSessionDescription", {
  enumerable: true,
  get: function () {
    return _RTCSessionDescription.default;
  }
});
Object.defineProperty(exports, "RTCView", {
  enumerable: true,
  get: function () {
    return _RTCView.default;
  }
});
Object.defineProperty(exports, "ScreenCapturePickerView", {
  enumerable: true,
  get: function () {
    return _ScreenCapturePickerView.default;
  }
});
Object.defineProperty(exports, "mediaDevices", {
  enumerable: true,
  get: function () {
    return _MediaDevices.default;
  }
});
Object.defineProperty(exports, "permissions", {
  enumerable: true,
  get: function () {
    return _Permissions.default;
  }
});
exports.registerGlobals = registerGlobals;
Object.defineProperty(exports, "startIOSPIP", {
  enumerable: true,
  get: function () {
    return _RTCPIPView.startIOSPIP;
  }
});
Object.defineProperty(exports, "stopIOSPIP", {
  enumerable: true,
  get: function () {
    return _RTCPIPView.stopIOSPIP;
  }
});
var _reactNative = require("react-native");
var _EventEmitter = require("./EventEmitter");
var _Logger = _interopRequireDefault(require("./Logger"));
var _MediaDevices = _interopRequireDefault(require("./MediaDevices"));
var _MediaStream = _interopRequireDefault(require("./MediaStream"));
var _MediaStreamTrack = _interopRequireDefault(require("./MediaStreamTrack"));
var _MediaStreamTrackEvent = _interopRequireDefault(require("./MediaStreamTrackEvent"));
var _Permissions = _interopRequireDefault(require("./Permissions"));
var _RTCAudioSession = _interopRequireDefault(require("./RTCAudioSession"));
var _RTCErrorEvent = _interopRequireDefault(require("./RTCErrorEvent"));
var _RTCFrameCryptor = _interopRequireWildcard(require("./RTCFrameCryptor"));
var _RTCFrameCryptorFactory = _interopRequireWildcard(require("./RTCFrameCryptorFactory"));
var _RTCIceCandidate = _interopRequireDefault(require("./RTCIceCandidate"));
var _RTCKeyProvider = _interopRequireDefault(require("./RTCKeyProvider"));
var _RTCPIPView = _interopRequireWildcard(require("./RTCPIPView"));
var _RTCPeerConnection = _interopRequireDefault(require("./RTCPeerConnection"));
var _RTCRtpReceiver = _interopRequireDefault(require("./RTCRtpReceiver"));
var _RTCRtpSender = _interopRequireDefault(require("./RTCRtpSender"));
var _RTCRtpTransceiver = _interopRequireDefault(require("./RTCRtpTransceiver"));
var _RTCSessionDescription = _interopRequireDefault(require("./RTCSessionDescription"));
var _RTCView = _interopRequireDefault(require("./RTCView"));
var _ScreenCapturePickerView = _interopRequireDefault(require("./ScreenCapturePickerView"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  WebRTCModule
} = _reactNative.NativeModules;
if (WebRTCModule === null) {
  throw new Error(`WebRTC native module not found.\n${_reactNative.Platform.OS === 'ios' ? 'Try executing the "pod install" command inside your projects ios folder.' : 'Try executing the "npm install" command inside your projects folder.'}`);
}
_Logger.default.enable(`${_Logger.default.ROOT_PREFIX}:*`);

// Add listeners for the native events early, since they are added asynchronously.
(0, _EventEmitter.setupNativeEvents)();
function registerGlobals() {
  // Should not happen. React Native has a global navigator object.
  if (typeof global.navigator !== 'object') {
    throw new Error('navigator is not an object');
  }
  if (!global.navigator.mediaDevices) {
    global.navigator.mediaDevices = {};
  }
  global.navigator.mediaDevices.getUserMedia = _MediaDevices.default.getUserMedia.bind(_MediaDevices.default);
  global.navigator.mediaDevices.getDisplayMedia = _MediaDevices.default.getDisplayMedia.bind(_MediaDevices.default);
  global.navigator.mediaDevices.enumerateDevices = _MediaDevices.default.enumerateDevices.bind(_MediaDevices.default);
  global.RTCIceCandidate = _RTCIceCandidate.default;
  global.RTCPeerConnection = _RTCPeerConnection.default;
  global.RTCRtpReceiver = _RTCRtpReceiver.default;
  global.RTCRtpSender = _RTCRtpReceiver.default;
  global.RTCSessionDescription = _RTCSessionDescription.default;
  global.MediaStream = _MediaStream.default;
  global.MediaStreamTrack = _MediaStreamTrack.default;
  global.MediaStreamTrackEvent = _MediaStreamTrackEvent.default;
  global.RTCRtpTransceiver = _RTCRtpTransceiver.default;
  global.RTCRtpReceiver = _RTCRtpReceiver.default;
  global.RTCRtpSender = _RTCRtpSender.default;
  global.RTCErrorEvent = _RTCErrorEvent.default;
}
//# sourceMappingURL=index.js.map