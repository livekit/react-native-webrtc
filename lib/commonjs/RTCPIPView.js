"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.startIOSPIP = startIOSPIP;
exports.stopIOSPIP = stopIOSPIP;
var _react = require("react");
var _reactNative = _interopRequireWildcard(require("react-native"));
var _RTCView = _interopRequireDefault(require("./RTCView"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * A convenience wrapper around RTCView to handle the fallback view as a prop.
 */
const RTCPIPView = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  var _rtcViewProps$iosPIP, _rtcViewProps$iosPIP2;
  const rtcViewProps = {
    ...props
  };
  const fallbackView = (_rtcViewProps$iosPIP = rtcViewProps.iosPIP) === null || _rtcViewProps$iosPIP === void 0 ? void 0 : _rtcViewProps$iosPIP.fallbackView;
  (_rtcViewProps$iosPIP2 = rtcViewProps.iosPIP) === null || _rtcViewProps$iosPIP2 === void 0 ? true : delete _rtcViewProps$iosPIP2.fallbackView;
  return /*#__PURE__*/React.createElement(_RTCView.default, _extends({
    ref: ref
  }, rtcViewProps), fallbackView);
});
function startIOSPIP(ref) {
  _reactNative.UIManager.dispatchViewManagerCommand(_reactNative.default.findNodeHandle(ref.current), _reactNative.UIManager.getViewManagerConfig('RTCVideoView').Commands.startIOSPIP, []);
}
function stopIOSPIP(ref) {
  _reactNative.UIManager.dispatchViewManagerCommand(_reactNative.default.findNodeHandle(ref.current), _reactNative.UIManager.getViewManagerConfig('RTCVideoView').Commands.stopIOSPIP, []);
}
var _default = RTCPIPView;
exports.default = _default;
//# sourceMappingURL=RTCPIPView.js.map