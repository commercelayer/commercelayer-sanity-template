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

var _reactInstantsearchCore = require("react-instantsearch-core");

var _utils = require("../core/utils");

var _Link = _interopRequireDefault(require("./Link"));

var cx = (0, _utils.createClassNames)('Breadcrumb');

var itemsPropType = _propTypes.default.arrayOf(_propTypes.default.shape({
  label: _propTypes.default.string.isRequired,
  value: _propTypes.default.string.isRequired
}));

var Breadcrumb =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Breadcrumb, _Component);

  function Breadcrumb() {
    (0, _classCallCheck2.default)(this, Breadcrumb);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Breadcrumb).apply(this, arguments));
  }

  (0, _createClass2.default)(Breadcrumb, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          canRefine = _this$props.canRefine,
          createURL = _this$props.createURL,
          items = _this$props.items,
          refine = _this$props.refine,
          rootURL = _this$props.rootURL,
          separator = _this$props.separator,
          translate = _this$props.translate,
          className = _this$props.className;
      var rootPath = canRefine ? _react.default.createElement("li", {
        className: cx('item')
      }, _react.default.createElement(_Link.default, {
        className: cx('link'),
        onClick: function onClick() {
          return !rootURL ? refine() : null;
        },
        href: rootURL ? rootURL : createURL()
      }, translate('rootLabel'))) : null;
      var breadcrumb = items.map(function (item, idx) {
        var isLast = idx === items.length - 1;
        return _react.default.createElement("li", {
          className: cx('item', isLast && 'item--selected'),
          key: idx
        }, _react.default.createElement("span", {
          className: cx('separator')
        }, separator), !isLast ? _react.default.createElement(_Link.default, {
          className: cx('link'),
          onClick: function onClick() {
            return refine(item.value);
          },
          href: createURL(item.value)
        }, item.label) : item.label);
      });
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(cx('', !canRefine && '-noRefinement'), className)
      }, _react.default.createElement("ul", {
        className: cx('list')
      }, rootPath, breadcrumb));
    }
  }]);
  return Breadcrumb;
}(_react.Component);

(0, _defineProperty2.default)(Breadcrumb, "propTypes", {
  canRefine: _propTypes.default.bool.isRequired,
  createURL: _propTypes.default.func.isRequired,
  items: itemsPropType,
  refine: _propTypes.default.func.isRequired,
  rootURL: _propTypes.default.string,
  separator: _propTypes.default.node,
  translate: _propTypes.default.func.isRequired,
  className: _propTypes.default.string
});
(0, _defineProperty2.default)(Breadcrumb, "defaultProps", {
  rootURL: null,
  separator: ' > ',
  className: ''
});

var _default = (0, _reactInstantsearchCore.translatable)({
  rootLabel: 'Home'
})(Breadcrumb);

exports.default = _default;