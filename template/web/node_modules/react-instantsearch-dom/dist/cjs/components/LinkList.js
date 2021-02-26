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

var _Link = _interopRequireDefault(require("./Link"));

var LinkList =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LinkList, _Component);

  function LinkList() {
    (0, _classCallCheck2.default)(this, LinkList);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LinkList).apply(this, arguments));
  }

  (0, _createClass2.default)(LinkList, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          cx = _this$props.cx,
          createURL = _this$props.createURL,
          items = _this$props.items,
          onSelect = _this$props.onSelect,
          canRefine = _this$props.canRefine;
      return _react.default.createElement("ul", {
        className: cx('list', !canRefine && 'list--noRefinement')
      }, items.map(function (item) {
        return _react.default.createElement("li", {
          key: item.key === undefined ? item.value : item.key,
          className: cx('item', item.selected && !item.disabled && 'item--selected', item.disabled && 'item--disabled', item.modifier)
        }, item.disabled ? _react.default.createElement("span", {
          className: cx('link')
        }, item.label === undefined ? item.value : item.label) : _react.default.createElement(_Link.default, {
          className: cx('link', item.selected && 'link--selected'),
          "aria-label": item.ariaLabel,
          href: createURL(item.value),
          onClick: function onClick() {
            return onSelect(item.value);
          }
        }, item.label === undefined ? item.value : item.label));
      }));
    }
  }]);
  return LinkList;
}(_react.Component);

exports.default = LinkList;
(0, _defineProperty2.default)(LinkList, "propTypes", {
  cx: _propTypes.default.func.isRequired,
  createURL: _propTypes.default.func.isRequired,
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.object]).isRequired,
    key: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
    label: _propTypes.default.node,
    modifier: _propTypes.default.string,
    ariaLabel: _propTypes.default.string,
    disabled: _propTypes.default.bool
  })),
  onSelect: _propTypes.default.func.isRequired,
  canRefine: _propTypes.default.bool.isRequired
});