"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
const {
  WebRTCModule
} = _reactNative.NativeModules;
class RTCAudioSession {
  /**
   * To be called when CallKit activates the audio session.
   */
  static audioSessionDidActivate() {
    // Only valid for iOS
    if (_reactNative.Platform.OS === 'ios') {
      WebRTCModule.audioSessionDidActivate();
    }
  }

  /**
   * To be called when CallKit deactivates the audio session.
   */
  static audioSessionDidDeactivate() {
    // Only valid for iOS
    if (_reactNative.Platform.OS === 'ios') {
      WebRTCModule.audioSessionDidDeactivate();
    }
  }
}
exports.default = RTCAudioSession;
//# sourceMappingURL=RTCAudioSession.js.map