"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RTCFrameCryptorStateEvent = exports.RTCFrameCryptorState = void 0;
var _index = require("event-target-shim/index");
var _reactNative = require("react-native");
var _EventEmitter = require("./EventEmitter");
var _Logger = _interopRequireDefault(require("./Logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const {
  WebRTCModule
} = _reactNative.NativeModules;
const log = new _Logger.default('pc');
/**
 * @eventClass
 * This event is fired whenever the RTCDataChannel has changed in any way.
 * @param {FRAME_CRYPTOR_EVENTS} type - The type of event.
 * @param {IRTCDataChannelEventInitDict} eventInitDict - The event init properties.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel#events MDN} for details.
 */
class RTCFrameCryptorStateEvent extends _index.Event {
  /** @eventProperty */

  /** @eventProperty */

  constructor(type, eventInitDict) {
    super(type, eventInitDict);
    _defineProperty(this, "frameCryptor", void 0);
    _defineProperty(this, "state", void 0);
    this.frameCryptor = eventInitDict.frameCryptor;
    this.state = eventInitDict.state;
  }
}
exports.RTCFrameCryptorStateEvent = RTCFrameCryptorStateEvent;
let RTCFrameCryptorState;
exports.RTCFrameCryptorState = RTCFrameCryptorState;
(function (RTCFrameCryptorState) {
  RTCFrameCryptorState[RTCFrameCryptorState["FrameCryptorStateNew"] = 0] = "FrameCryptorStateNew";
  RTCFrameCryptorState[RTCFrameCryptorState["FrameCryptorStateOk"] = 1] = "FrameCryptorStateOk";
  RTCFrameCryptorState[RTCFrameCryptorState["FrameCryptorStateEncryptionFailed"] = 2] = "FrameCryptorStateEncryptionFailed";
  RTCFrameCryptorState[RTCFrameCryptorState["FrameCryptorStateDecryptionFailed"] = 3] = "FrameCryptorStateDecryptionFailed";
  RTCFrameCryptorState[RTCFrameCryptorState["FrameCryptorStateMissingKey"] = 4] = "FrameCryptorStateMissingKey";
  RTCFrameCryptorState[RTCFrameCryptorState["FrameCryptorStateKeyRatcheted"] = 5] = "FrameCryptorStateKeyRatcheted";
  RTCFrameCryptorState[RTCFrameCryptorState["FrameCryptorStateInternalError"] = 6] = "FrameCryptorStateInternalError";
})(RTCFrameCryptorState || (exports.RTCFrameCryptorState = RTCFrameCryptorState = {}));
class RTCFrameCryptor extends _index.EventTarget {
  constructor(frameCryptorId, participantId) {
    super();
    _defineProperty(this, "_frameCryptorId", void 0);
    _defineProperty(this, "_participantId", void 0);
    this._frameCryptorId = frameCryptorId;
    this._participantId = participantId;
    this._registerEvents();
  }
  get id() {
    return this._frameCryptorId;
  }
  get participantId() {
    return this._participantId;
  }
  _cryptorStateFromString(str) {
    switch (str) {
      case 'new':
        return RTCFrameCryptorState.FrameCryptorStateNew;
      case 'ok':
        return RTCFrameCryptorState.FrameCryptorStateOk;
      case 'decryptionFailed':
        return RTCFrameCryptorState.FrameCryptorStateDecryptionFailed;
      case 'encryptionFailed':
        return RTCFrameCryptorState.FrameCryptorStateEncryptionFailed;
      case 'internalError':
        return RTCFrameCryptorState.FrameCryptorStateInternalError;
      case 'keyRatcheted':
        return RTCFrameCryptorState.FrameCryptorStateKeyRatcheted;
      case 'missingKey':
        return RTCFrameCryptorState.FrameCryptorStateMissingKey;
      default:
        throw 'Unknown FrameCryptorState: $str';
    }
  }
  async setKeyIndex(keyIndex) {
    const params = {
      frameCryptorId: this._frameCryptorId,
      keyIndex
    };
    return WebRTCModule.frameCryptorSetKeyIndex(params).then(data => data['result']);
  }
  async getKeyIndex() {
    const params = {
      frameCryptorId: this._frameCryptorId
    };
    return WebRTCModule.frameCryptorGetKeyIndex(params).then(data => data['keyIndex']);
  }
  async setEnabled(enabled) {
    const params = {
      frameCryptorId: this._frameCryptorId,
      enabled
    };
    return WebRTCModule.frameCryptorSetEnabled(params).then(data => data['result']);
  }
  async getEnabled() {
    const params = {
      frameCryptorId: this._frameCryptorId
    };
    return WebRTCModule.frameCryptorGetEnabled(params).then(data => data['enabled']);
  }
  async dispose() {
    const params = {
      frameCryptorId: this._frameCryptorId
    };
    await WebRTCModule.frameCryptorDispose(params);
    (0, _EventEmitter.removeListener)(this);
  }
  _registerEvents() {
    (0, _EventEmitter.addListener)(this, 'frameCryptionStateChanged', ev => {
      if (ev.participantId !== this._participantId || ev.frameCryptorId !== this._frameCryptorId) {
        return;
      }
      log.debug(`${this.id} frameCryptionStateChanged ${ev.state}`);
      const initDict = {
        frameCryptor: this,
        state: ev.state
      };
      this.dispatchEvent(new RTCFrameCryptorStateEvent('onframecryptorstatechanged', initDict));
    });
  }
}

/**
 * Define the `onxxx` event handlers.
 */
exports.default = RTCFrameCryptor;
const proto = RTCFrameCryptor.prototype;
(0, _index.defineEventAttribute)(proto, 'onframecryptorstatechanged');
//# sourceMappingURL=RTCFrameCryptor.js.map