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

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../core/utils");

var _Select = _interopRequireDefault(require("./Select"));

var cx = (0, _utils.createClassNames)('HitsPerPage');

var HitsPerPage =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(HitsPerPage, _Component);

  function HitsPerPage() {
    (0, _classCallCheck2.default)(this, HitsPerPage);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HitsPerPage).apply(this, arguments));
  }

  (0, _createClass2.default)(HitsPerPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          items = _this$props.items,
          currentRefinement = _this$props.currentRefinement,
          refine = _this$props.refine,
          className = _this$props.className;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(cx(''), className)
      }, _react.default.createElement(_Select.default, {
        onSelect: refine,
        selectedItem: currentRefinement,
        items: items,
        cx: cx
      }));
    }
  }]);
  return HitsPerPage;
}(_react.Component);

(0, _defineProperty2.default)(HitsPerPage, "propTypes", {
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    value: _propTypes.default.number.isRequired,
    label: _propTypes.default.string
  })).isRequired,
  currentRefinement: _propTypes.default.number.isRequired,
  refine: _propTypes.default.func.isRequired,
  className: _propTypes.default.string
});
(0, _defineProperty2.default)(HitsPerPage, "defaultProps", {
  className: ''
});
var _default = HitsPerPage;
exports.default = _default;