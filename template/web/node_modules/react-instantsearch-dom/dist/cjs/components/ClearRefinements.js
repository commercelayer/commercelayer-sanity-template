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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactInstantsearchCore = require("react-instantsearch-core");

var _utils = require("../core/utils");

var cx = (0, _utils.createClassNames)('ClearRefinements');

var ClearRefinements =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ClearRefinements, _Component);

  function ClearRefinements() {
    (0, _classCallCheck2.default)(this, ClearRefinements);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ClearRefinements).apply(this, arguments));
  }

  (0, _createClass2.default)(ClearRefinements, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          items = _this$props.items,
          canRefine = _this$props.canRefine,
          refine = _this$props.refine,
          translate = _this$props.translate,
          className = _this$props.className;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(cx(''), className)
      }, _react.default.createElement("button", {
        className: cx('button', !canRefine && 'button--disabled'),
        onClick: function onClick() {
          return refine(items);
        },
        disabled: !canRefine
      }, translate('reset')));
    }
  }]);
  return ClearRefinements;
}(_react.Component);

(0, _defineProperty2.default)(ClearRefinements, "propTypes", {
  items: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  canRefine: _propTypes.default.bool.isRequired,
  refine: _propTypes.default.func.isRequired,
  translate: _propTypes.default.func.isRequired,
  className: _propTypes.default.string
});
(0, _defineProperty2.default)(ClearRefinements, "defaultProps", {
  className: ''
});

var _default = (0, _reactInstantsearchCore.translatable)({
  reset: 'Clear all filters'
})(ClearRefinements);

exports.default = _default;