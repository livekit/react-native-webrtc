import { Component } from 'react';
import ReactNative from 'react-native';
import { RTCIOSPIPOptions, RTCVideoViewProps } from './RTCView';
export interface RTCPIPViewProps extends RTCVideoViewProps {
    iosPIP?: RTCIOSPIPOptions & {
        fallbackView?: Component;
    };
}
/**
 * A convenience wrapper around RTCView to handle the fallback view as a prop.
 */
declare const RTCPIPView: import("react").ForwardRefExoticComponent<RTCPIPViewProps & import("react").RefAttributes<Component<RTCVideoViewProps, {}, any> & Readonly<ReactNative.NativeMethods>>>;
export declare function startIOSPIP(ref: any): void;
export declare function stopIOSPIP(ref: any): void;
export default RTCPIPView;
