"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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

var cx = (0, _utils.createClassNames)('RatingMenu');

var RatingMenu =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RatingMenu, _Component);

  function RatingMenu() {
    (0, _classCallCheck2.default)(this, RatingMenu);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RatingMenu).apply(this, arguments));
  }

  (0, _createClass2.default)(RatingMenu, [{
    key: "onClick",
    value: function onClick(min, max, e) {
      e.preventDefault();
      e.stopPropagation();

      if (min === this.props.currentRefinement.min && max === this.props.currentRefinement.max) {
        this.props.refine({
          min: this.props.min,
          max: this.props.max
        });
      } else {
        this.props.refine({
          min: min,
          max: max
        });
      }
    }
  }, {
    key: "buildItem",
    value: function buildItem(_ref) {
      var max = _ref.max,
          lowerBound = _ref.lowerBound,
          count = _ref.count,
          translate = _ref.translate,
          createURL = _ref.createURL,
          isLastSelectableItem = _ref.isLastSelectableItem;
      var disabled = !count;
      var isCurrentMinLower = this.props.currentRefinement.min < lowerBound;
      var selected = isLastSelectableItem && isCurrentMinLower || !disabled && lowerBound === this.props.currentRefinement.min && max === this.props.currentRefinement.max;
      var icons = [];
      var rating = 0;

      for (var icon = 0; icon < max; icon++) {
        if (icon < lowerBound) {
          rating++;
        }

        icons.push([_react.default.createElement("svg", {
          key: icon,
          className: cx('starIcon', icon >= lowerBound ? 'starIcon--empty' : 'starIcon--full'),
          "aria-hidden": "true",
          width: "24",
          height: "24"
        }, _react.default.createElement("use", {
          xlinkHref: "#".concat(cx(icon >= lowerBound ? 'starEmptySymbol' : 'starSymbol'))
        })), ' ']);
      } // The last item of the list (the default item), should not
      // be clickable if it is selected.


      var isLastAndSelect = isLastSelectableItem && selected;
      var onClickHandler = disabled || isLastAndSelect ? {} : {
        href: createURL({
          min: lowerBound,
          max: max
        }),
        onClick: this.onClick.bind(this, lowerBound, max)
      };
      return _react.default.createElement("li", {
        key: lowerBound,
        className: cx('item', selected && 'item--selected', disabled && 'item--disabled')
      }, _react.default.createElement("a", (0, _extends2.default)({
        className: cx('link'),
        "aria-label": "".concat(rating).concat(translate('ratingLabel'))
      }, onClickHandler), icons, _react.default.createElement("span", {
        className: cx('label'),
        "aria-hidden": "true"
      }, translate('ratingLabel')), ' ', _react.default.createElement("span", {
        className: cx('count')
      }, count)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          min = _this$props.min,
          max = _this$props.max,
          translate = _this$props.translate,
          count = _this$props.count,
          createURL = _this$props.createURL,
          canRefine = _this$props.canRefine,
          className = _this$props.className; // min & max are always set when there is a results, otherwise it means
      // that we don't want to render anything since we don't have any values.

      var limitMin = min !== undefined && min >= 0 ? min : 1;
      var limitMax = max !== undefined && max >= 0 ? max : 0;
      var inclusiveLength = limitMax - limitMin + 1;
      var values = count.map(function (item) {
        return (0, _objectSpread2.default)({}, item, {
          value: parseFloat(item.value)
        });
      }).filter(function (item) {
        return item.value >= limitMin && item.value <= limitMax;
      });
      var items = (0, _utils.range)({
        start: 0,
        end: Math.max(inclusiveLength, 0)
      }).map(function (index) {
        var element = (0, _utils.find)(values, function (item) {
          return item.value === limitMax - index;
        });
        var placeholder = {
          value: limitMax - index,
          count: 0,
          total: 0
        };
        return element || placeholder;
      }).reduce(function (acc, item, index) {
        return acc.concat((0, _objectSpread2.default)({}, item, {
          total: index === 0 ? item.count : acc[index - 1].total + item.count
        }));
      }, []).map(function (item, index, arr) {
        return _this.buildItem({
          lowerBound: item.value,
          count: item.total,
          isLastSelectableItem: arr.length - 1 === index,
          max: limitMax,
          translate: translate,
          createURL: createURL
        });
      });
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(cx('', !canRefine && '-noRefinement'), className)
      }, _react.default.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          display: 'none'
        }
      }, _react.default.createElement("symbol", {
        id: cx('starSymbol'),
        viewBox: "0 0 24 24"
      }, _react.default.createElement("path", {
        d: "M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"
      })), _react.default.createElement("symbol", {
        id: cx('starEmptySymbol'),
        viewBox: "0 0 24 24"
      }, _react.default.createElement("path", {
        d: "M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"
      }))), _react.default.createElement("ul", {
        className: cx('list', !canRefine && 'list--noRefinement')
      }, items));
    }
  }]);
  return RatingMenu;
}(_react.Component);

(0, _defineProperty2.default)(RatingMenu, "propTypes", {
  translate: _propTypes.default.func.isRequired,
  refine: _propTypes.default.func.isRequired,
  createURL: _propTypes.default.func.isRequired,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  currentRefinement: _propTypes.default.shape({
    min: _propTypes.default.number,
    max: _propTypes.default.number
  }),
  count: _propTypes.default.arrayOf(_propTypes.default.shape({
    value: _propTypes.default.string,
    count: _propTypes.default.number
  })),
  canRefine: _propTypes.default.bool.isRequired,
  className: _propTypes.default.string
});
(0, _defineProperty2.default)(RatingMenu, "defaultProps", {
  className: ''
});

var _default = (0, _reactInstantsearchCore.translatable)({
  ratingLabel: ' & Up'
})(RatingMenu);

exports.default = _default;