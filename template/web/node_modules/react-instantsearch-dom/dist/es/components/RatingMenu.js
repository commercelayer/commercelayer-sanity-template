import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translatable } from 'react-instantsearch-core';
import { createClassNames, find, range } from '../core/utils';
var cx = createClassNames('RatingMenu');

var RatingMenu =
/*#__PURE__*/
function (_Component) {
  _inherits(RatingMenu, _Component);

  function RatingMenu() {
    _classCallCheck(this, RatingMenu);

    return _possibleConstructorReturn(this, _getPrototypeOf(RatingMenu).apply(this, arguments));
  }

  _createClass(RatingMenu, [{
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

        icons.push([React.createElement("svg", {
          key: icon,
          className: cx('starIcon', icon >= lowerBound ? 'starIcon--empty' : 'starIcon--full'),
          "aria-hidden": "true",
          width: "24",
          height: "24"
        }, React.createElement("use", {
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
      return React.createElement("li", {
        key: lowerBound,
        className: cx('item', selected && 'item--selected', disabled && 'item--disabled')
      }, React.createElement("a", _extends({
        className: cx('link'),
        "aria-label": "".concat(rating).concat(translate('ratingLabel'))
      }, onClickHandler), icons, React.createElement("span", {
        className: cx('label'),
        "aria-hidden": "true"
      }, translate('ratingLabel')), ' ', React.createElement("span", {
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
        return _objectSpread({}, item, {
          value: parseFloat(item.value)
        });
      }).filter(function (item) {
        return item.value >= limitMin && item.value <= limitMax;
      });
      var items = range({
        start: 0,
        end: Math.max(inclusiveLength, 0)
      }).map(function (index) {
        var element = find(values, function (item) {
          return item.value === limitMax - index;
        });
        var placeholder = {
          value: limitMax - index,
          count: 0,
          total: 0
        };
        return element || placeholder;
      }).reduce(function (acc, item, index) {
        return acc.concat(_objectSpread({}, item, {
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
      return React.createElement("div", {
        className: classNames(cx('', !canRefine && '-noRefinement'), className)
      }, React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          display: 'none'
        }
      }, React.createElement("symbol", {
        id: cx('starSymbol'),
        viewBox: "0 0 24 24"
      }, React.createElement("path", {
        d: "M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"
      })), React.createElement("symbol", {
        id: cx('starEmptySymbol'),
        viewBox: "0 0 24 24"
      }, React.createElement("path", {
        d: "M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"
      }))), React.createElement("ul", {
        className: cx('list', !canRefine && 'list--noRefinement')
      }, items));
    }
  }]);

  return RatingMenu;
}(Component);

_defineProperty(RatingMenu, "propTypes", {
  translate: PropTypes.func.isRequired,
  refine: PropTypes.func.isRequired,
  createURL: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  currentRefinement: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }),
  count: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    count: PropTypes.number
  })),
  canRefine: PropTypes.bool.isRequired,
  className: PropTypes.string
});

_defineProperty(RatingMenu, "defaultProps", {
  className: ''
});

export default translatable({
  ratingLabel: ' & Up'
})(RatingMenu);