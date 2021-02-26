"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var cx = (0, _utils.createClassNames)('NumericMenu');

var NumericMenu =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(NumericMenu, _Component);

  function NumericMenu() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, NumericMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(NumericMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderItem", function (item) {
      var _this$props = _this.props,
          refine = _this$props.refine,
          translate = _this$props.translate;
      return _react.default.createElement("label", {
        className: cx('label')
      }, _react.default.createElement("input", {
        className: cx('radio'),
        type: "radio",
        checked: item.isRefined,
        disabled: item.noRefinement,
        onChange: function onChange() {
          return refine(item.value);
        }
      }), _react.default.createElement("span", {
        className: cx('labelText')
      }, item.value === '' ? translate('all') : item.label));
    });
    return _this;
  }

  (0, _createClass2.default)(NumericMenu, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          items = _this$props2.items,
          canRefine = _this$props2.canRefine,
          className = _this$props2.className;
      return _react.default.createElement(_List.default, {
        renderItem: this.renderItem,
        showMore: false,
        canRefine: canRefine,
        cx: cx,
        items: items.map(function (item) {
          return (0, _objectSpread2.default)({}, item, {
            key: item.value
          });
        }),
        className: className
      });
    }
  }]);
  return NumericMenu;
}(_react.Component);

(0, _defineProperty2.default)(NumericMenu, "propTypes", {
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.node.isRequired,
    value: _propTypes.default.string.isRequired,
    isRefined: _propTypes.default.bool.isRequired,
    noRefinement: _propTypes.default.bool.isRequired
  })).isRequired,
  canRefine: _propTypes.default.bool.isRequired,
  refine: _propTypes.default.func.isRequired,
  translate: _propTypes.default.func.isRequired,
  className: _propTypes.default.string
});
(0, _defineProperty2.default)(NumericMenu, "defaultProps", {
  className: ''
});

var _default = (0, _reactInstantsearchCore.translatable)({
  all: 'All'
})(NumericMenu);

exports.default = _default;