function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
import * as base64 from 'base64-js';
import { NativeModules } from 'react-native';
const {
  WebRTCModule
} = NativeModules;
export let FrameCryptorState;
(function (FrameCryptorState) {
  FrameCryptorState[FrameCryptorState["FrameCryptorStateNew"] = 0] = "FrameCryptorStateNew";
  FrameCryptorState[FrameCryptorState["FrameCryptorStateOk"] = 1] = "FrameCryptorStateOk";
  FrameCryptorState[FrameCryptorState["FrameCryptorStateEncryptionFailed"] = 2] = "FrameCryptorStateEncryptionFailed";
  FrameCryptorState[FrameCryptorState["FrameCryptorStateDecryptionFailed"] = 3] = "FrameCryptorStateDecryptionFailed";
  FrameCryptorState[FrameCryptorState["FrameCryptorStateMissingKey"] = 4] = "FrameCryptorStateMissingKey";
  FrameCryptorState[FrameCryptorState["FrameCryptorStateKeyRatcheted"] = 5] = "FrameCryptorStateKeyRatcheted";
  FrameCryptorState[FrameCryptorState["FrameCryptorStateInternalError"] = 6] = "FrameCryptorStateInternalError";
})(FrameCryptorState || (FrameCryptorState = {}));
export default class RTCKeyProvider {
  constructor(keyProviderId) {
    _defineProperty(this, "_id", void 0);
    this._id = keyProviderId;
  }
  async setSharedKey(key) {
    let keyIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    const params = {
      keyProviderId: this._id,
      keyIndex
    };
    if (typeof key === 'string') {
      params['key'] = key;
      params['keyIsBase64'] = false;
    } else {
      params['key'] = base64.fromByteArray(key);
      params['keyIsBase64'] = true;
    }
    return WebRTCModule.keyProviderSetSharedKey(params).then(data => data['result']);
  }
  async ratchetSharedKey() {
    let keyIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    const params = {
      keyProviderId: this._id,
      keyIndex
    };
    return WebRTCModule.keyProviderRatchetSharedKey(params).then(data => base64.toByteArray(data['result']));
  }
  async exportSharedKey() {
    let keyIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    const params = {
      keyProviderId: this._id,
      keyIndex
    };
    return WebRTCModule.keyProviderExportSharedKey(params).then(data => base64.toByteArray(data['result']));
  }
  async setKey(participantId, key) {
    let keyIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    const params = {
      keyProviderId: this._id,
      participantId,
      keyIndex
    };
    if (typeof key === 'string') {
      params['key'] = key;
      params['keyIsBase64'] = false;
    } else {
      params['key'] = base64.fromByteArray(key);
      params['keyIsBase64'] = true;
    }
    return WebRTCModule.keyProviderSetKey(params).then(data => data['result']);
  }
  async ratchetKey(participantId) {
    let keyIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    const params = {
      keyProviderId: this._id,
      participantId,
      keyIndex
    };
    return WebRTCModule.keyProviderRatchetKey(params).then(data => base64.toByteArray(data['result']));
  }
  async exportKey(participantId) {
    let keyIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    const params = {
      keyProviderId: this._id,
      participantId,
      keyIndex
    };
    return WebRTCModule.keyProviderExportKey(params).then(data => base64.toByteArray(data['result']));
  }
  async setSifTrailer(trailer) {
    const params = {
      keyProviderId: this._id,
      'sifTrailer': base64.fromByteArray(trailer)
    };
    return WebRTCModule.keyProviderSetSifTrailer(params);
  }
  async dispose() {
    const params = {
      keyProviderId: this._id
    };
    return WebRTCModule.keyProviderDispose(params);
  }
}
//# sourceMappingURL=RTCKeyProvider.js.map