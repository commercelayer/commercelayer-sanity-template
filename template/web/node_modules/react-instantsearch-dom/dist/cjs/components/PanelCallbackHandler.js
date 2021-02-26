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

var _Panel = require("./Panel");

var PanelCallbackHandler =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PanelCallbackHandler, _Component);

  function PanelCallbackHandler() {
    (0, _classCallCheck2.default)(this, PanelCallbackHandler);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PanelCallbackHandler).apply(this, arguments));
  }

  (0, _createClass2.default)(PanelCallbackHandler, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.setCanRefine(this.props.canRefine);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.canRefine !== this.props.canRefine) {
        this.props.setCanRefine(this.props.canRefine);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return PanelCallbackHandler;
}(_react.Component);

(0, _defineProperty2.default)(PanelCallbackHandler, "propTypes", {
  children: _propTypes.default.node.isRequired,
  canRefine: _propTypes.default.bool.isRequired,
  setCanRefine: _propTypes.default.func.isRequired
});

var PanelWrapper = function PanelWrapper(_ref) {
  var canRefine = _ref.canRefine,
      children = _ref.children;
  return _react.default.createElement(_Panel.PanelConsumer, null, function (setCanRefine) {
    return _react.default.createElement(PanelCallbackHandler, {
      setCanRefine: setCanRefine,
      canRefine: canRefine
    }, children);
  });
};

PanelWrapper.propTypes = {
  canRefine: _propTypes.default.bool.isRequired,
  children: _propTypes.default.node.isRequired
};
var _default = PanelWrapper;
exports.default = _default;