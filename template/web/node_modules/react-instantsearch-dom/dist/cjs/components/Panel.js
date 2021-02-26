"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PanelProvider = exports.PanelConsumer = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../core/utils");

var cx = (0, _utils.createClassNames)('Panel');

var _createContext = (0, _react.createContext)(function setCanRefine() {}),
    PanelConsumer = _createContext.Consumer,
    PanelProvider = _createContext.Provider;

exports.PanelProvider = PanelProvider;
exports.PanelConsumer = PanelConsumer;

var Panel =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Panel, _Component);

  function Panel() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Panel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Panel)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      canRefine: true
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setCanRefine", function (nextCanRefine) {
      _this.setState({
        canRefine: nextCanRefine
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Panel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          header = _this$props.header,
          footer = _this$props.footer;
      var canRefine = this.state.canRefine;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(cx('', !canRefine && '-noRefinement'), className)
      }, header && _react.default.createElement("div", {
        className: cx('header')
      }, header), _react.default.createElement("div", {
        className: cx('body')
      }, _react.default.createElement(PanelProvider, {
        value: this.setCanRefine
      }, children)), footer && _react.default.createElement("div", {
        className: cx('footer')
      }, footer));
    }
  }]);
  return Panel;
}(_react.Component);

(0, _defineProperty2.default)(Panel, "propTypes", {
  children: _propTypes.default.node.isRequired,
  className: _propTypes.default.string,
  header: _propTypes.default.node,
  footer: _propTypes.default.node
});
(0, _defineProperty2.default)(Panel, "defaultProps", {
  className: '',
  header: null,
  footer: null
});
var _default = Panel;
exports.default = _default;