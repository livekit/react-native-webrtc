function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
import RTCRtcpParameters from './RTCRtcpParameters';
import RTCRtpCodecParameters from './RTCRtpCodecParameters';
import RTCRtpHeaderExtension from './RTCRtpHeaderExtension';
import { deepClone } from './RTCUtil';
export default class RTCRtpParameters {
  constructor(init) {
    _defineProperty(this, "codecs", []);
    _defineProperty(this, "headerExtensions", []);
    _defineProperty(this, "rtcp", void 0);
    for (const codec of init.codecs) {
      this.codecs.push(new RTCRtpCodecParameters(codec));
    }
    for (const ext of init.headerExtensions) {
      this.headerExtensions.push(new RTCRtpHeaderExtension(ext));
    }
    this.rtcp = new RTCRtcpParameters(init.rtcp);
  }
  toJSON() {
    return {
      codecs: this.codecs.map(c => deepClone(c)),
      headerExtensions: this.headerExtensions.map(he => deepClone(he)),
      rtcp: deepClone(this.rtcp)
    };
  }
}
//# sourceMappingURL=RTCRtpParameters.js.map