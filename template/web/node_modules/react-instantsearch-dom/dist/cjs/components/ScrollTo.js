"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../core/utils");

var cx = (0, _utils.createClassNames)('ScrollTo');

var ScrollTo =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ScrollTo, _Component);

  function ScrollTo() {
    (0, _classCallCheck2.default)(this, ScrollTo);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ScrollTo).apply(this, arguments));
  }

  (0, _createClass2.default)(ScrollTo, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          value = _this$props.value,
          hasNotChanged = _this$props.hasNotChanged;

      if (value !== prevProps.value && hasNotChanged) {
        this.el.scrollIntoView();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return _react.default.createElement("div", {
        ref: function ref(_ref) {
          return _this.el = _ref;
        },
        className: cx('')
      }, this.props.children);
    }
  }]);
  return ScrollTo;
}(_react.Component);

(0, _defineProperty2.default)(ScrollTo, "propTypes", {
  value: _propTypes.default.any,
  children: _propTypes.default.node,
  hasNotChanged: _propTypes.default.bool
});
var _default = ScrollTo;
exports.default = _default;