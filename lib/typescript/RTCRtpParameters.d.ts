import RTCRtcpParameters, { RTCRtcpParametersInit } from './RTCRtcpParameters';
import RTCRtpCodecParameters, { RTCRtpCodecParametersInit } from './RTCRtpCodecParameters';
import RTCRtpHeaderExtension, { RTCRtpHeaderExtensionInit } from './RTCRtpHeaderExtension';
export interface RTCRtpParametersInit {
    codecs: RTCRtpCodecParametersInit[];
    headerExtensions: RTCRtpHeaderExtensionInit[];
    rtcp: RTCRtcpParametersInit;
}
export default class RTCRtpParameters {
    codecs: (RTCRtpCodecParameters | RTCRtpCodecParametersInit)[];
    readonly headerExtensions: RTCRtpHeaderExtension[];
    readonly rtcp: RTCRtcpParameters;
    constructor(init: RTCRtpParametersInit);
    toJSON(): {
        codecs: (RTCRtpCodecParametersInit | RTCRtpCodecParameters)[];
        headerExtensions: RTCRtpHeaderExtension[];
        rtcp: RTCRtcpParameters;
    };
}
