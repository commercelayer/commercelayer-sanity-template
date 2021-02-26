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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactInstantsearchCore = require("react-instantsearch-core");

var _utils = require("../core/utils");

var _List = _interopRequireDefault(require("./List"));

var _Link = _interopRequireDefault(require("./Link"));

var cx = (0, _utils.createClassNames)('HierarchicalMenu');

var itemsPropType = _propTypes.default.arrayOf(_propTypes.default.shape({
  label: _propTypes.default.string.isRequired,
  value: _propTypes.default.string,
  count: _propTypes.default.number.isRequired,
  items: function items() {
    return itemsPropType.apply(void 0, arguments);
  }
}));

var HierarchicalMenu =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(HierarchicalMenu, _Component);

  function HierarchicalMenu() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, HierarchicalMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(HierarchicalMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderItem", function (item) {
      var _this$props = _this.props,
          createURL = _this$props.createURL,
          refine = _this$props.refine;
      return _react.default.createElement(_Link.default, {
        className: cx('link'),
        onClick: function onClick() {
          return refine(item.value);
        },
        href: createURL(item.value)
      }, _react.default.createElement("span", {
        className: cx('label')
      }, item.label), ' ', _react.default.createElement("span", {
        className: cx('count')
      }, item.count));
    });
    return _this;
  }

  (0, _createClass2.default)(HierarchicalMenu, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          translate = _this$props2.translate,
          items = _this$props2.items,
          showMore = _this$props2.showMore,
          limit = _this$props2.limit,
          showMoreLimit = _this$props2.showMoreLimit,
          canRefine = _this$props2.canRefine,
          className = _this$props2.className;
      return _react.default.createElement(_List.default, {
        renderItem: this.renderItem,
        cx: cx,
        translate: translate,
        items: items,
        showMore: showMore,
        limit: limit,
        showMoreLimit: showMoreLimit,
        canRefine: canRefine,
        className: className
      });
    }
  }]);
  return HierarchicalMenu;
}(_react.Component);

(0, _defineProperty2.default)(HierarchicalMenu, "propTypes", {
  translate: _propTypes.default.func.isRequired,
  refine: _propTypes.default.func.isRequired,
  createURL: _propTypes.default.func.isRequired,
  canRefine: _propTypes.default.bool.isRequired,
  items: itemsPropType,
  showMore: _propTypes.default.bool,
  className: _propTypes.default.string,
  limit: _propTypes.default.number,
  showMoreLimit: _propTypes.default.number,
  transformItems: _propTypes.default.func
});
(0, _defineProperty2.default)(HierarchicalMenu, "defaultProps", {
  className: ''
});

var _default = (0, _reactInstantsearchCore.translatable)({
  showMore: function showMore(extended) {
    return extended ? 'Show less' : 'Show more';
  }
})(HierarchicalMenu);

exports.default = _default;