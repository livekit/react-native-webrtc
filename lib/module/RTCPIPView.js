function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { forwardRef } from 'react';
import ReactNative, { UIManager } from 'react-native';
import RTCView from './RTCView';
/**
 * A convenience wrapper around RTCView to handle the fallback view as a prop.
 */
const RTCPIPView = /*#__PURE__*/forwardRef((props, ref) => {
  var _rtcViewProps$iosPIP, _rtcViewProps$iosPIP2;
  const rtcViewProps = {
    ...props
  };
  const fallbackView = (_rtcViewProps$iosPIP = rtcViewProps.iosPIP) === null || _rtcViewProps$iosPIP === void 0 ? void 0 : _rtcViewProps$iosPIP.fallbackView;
  (_rtcViewProps$iosPIP2 = rtcViewProps.iosPIP) === null || _rtcViewProps$iosPIP2 === void 0 ? true : delete _rtcViewProps$iosPIP2.fallbackView;
  return /*#__PURE__*/React.createElement(RTCView, _extends({
    ref: ref
  }, rtcViewProps), fallbackView);
});
export function startIOSPIP(ref) {
  UIManager.dispatchViewManagerCommand(ReactNative.findNodeHandle(ref.current), UIManager.getViewManagerConfig('RTCVideoView').Commands.startIOSPIP, []);
}
export function stopIOSPIP(ref) {
  UIManager.dispatchViewManagerCommand(ReactNative.findNodeHandle(ref.current), UIManager.getViewManagerConfig('RTCVideoView').Commands.stopIOSPIP, []);
}
export default RTCPIPView;
//# sourceMappingURL=RTCPIPView.js.map