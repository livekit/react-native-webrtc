import RTCRtpEncodingParameters, { RTCRtpEncodingParametersInit } from './RTCRtpEncodingParameters';
import RTCRtpParameters, { RTCRtpParametersInit } from './RTCRtpParameters';
declare type DegradationPreferenceType = 'maintain-framerate' | 'maintain-resolution' | 'balanced' | 'disabled';
export interface RTCRtpSendParametersInit extends RTCRtpParametersInit {
    transactionId: string;
    encodings: RTCRtpEncodingParametersInit[];
    degradationPreference?: string;
}
export default class RTCRtpSendParameters extends RTCRtpParameters {
    readonly transactionId: string;
    encodings: (RTCRtpEncodingParameters | RTCRtpEncodingParametersInit)[];
    degradationPreference: DegradationPreferenceType | null;
    constructor(init: RTCRtpSendParametersInit);
    toJSON(): {
        codecs: (import("./RTCRtpCodecParameters").RTCRtpCodecParametersInit | import("./RTCRtpCodecParameters").default)[];
        headerExtensions: import("./RTCRtpHeaderExtension").default[];
        rtcp: import("./RTCRtcpParameters").default;
    };
}
export {};
