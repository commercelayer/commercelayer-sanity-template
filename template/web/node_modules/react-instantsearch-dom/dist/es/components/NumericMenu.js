import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-instantsearch-core';
import { createClassNames } from '../core/utils';
import List from './List';
var cx = createClassNames('NumericMenu');

var NumericMenu =
/*#__PURE__*/
function (_Component) {
  _inherits(NumericMenu, _Component);

  function NumericMenu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NumericMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NumericMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderItem", function (item) {
      var _this$props = _this.props,
          refine = _this$props.refine,
          translate = _this$props.translate;
      return React.createElement("label", {
        className: cx('label')
      }, React.createElement("input", {
        className: cx('radio'),
        type: "radio",
        checked: item.isRefined,
        disabled: item.noRefinement,
        onChange: function onChange() {
          return refine(item.value);
        }
      }), React.createElement("span", {
        className: cx('labelText')
      }, item.value === '' ? translate('all') : item.label));
    });

    return _this;
  }

  _createClass(NumericMenu, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          items = _this$props2.items,
          canRefine = _this$props2.canRefine,
          className = _this$props2.className;
      return React.createElement(List, {
        renderItem: this.renderItem,
        showMore: false,
        canRefine: canRefine,
        cx: cx,
        items: items.map(function (item) {
          return _objectSpread({}, item, {
            key: item.value
          });
        }),
        className: className
      });
    }
  }]);

  return NumericMenu;
}(Component);

_defineProperty(NumericMenu, "propTypes", {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node.isRequired,
    value: PropTypes.string.isRequired,
    isRefined: PropTypes.bool.isRequired,
    noRefinement: PropTypes.bool.isRequired
  })).isRequired,
  canRefine: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  className: PropTypes.string
});

_defineProperty(NumericMenu, "defaultProps", {
  className: ''
});

export default translatable({
  all: 'All'
})(NumericMenu);