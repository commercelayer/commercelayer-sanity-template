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
import Link from './Link';
var cx = createClassNames('HierarchicalMenu');
var itemsPropType = PropTypes.arrayOf(PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  count: PropTypes.number.isRequired,
  items: function items() {
    return itemsPropType.apply(void 0, arguments);
  }
}));

var HierarchicalMenu =
/*#__PURE__*/
function (_Component) {
  _inherits(HierarchicalMenu, _Component);

  function HierarchicalMenu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, HierarchicalMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(HierarchicalMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderItem", function (item) {
      var _this$props = _this.props,
          createURL = _this$props.createURL,
          refine = _this$props.refine;
      return React.createElement(Link, {
        className: cx('link'),
        onClick: function onClick() {
          return refine(item.value);
        },
        href: createURL(item.value)
      }, React.createElement("span", {
        className: cx('label')
      }, item.label), ' ', React.createElement("span", {
        className: cx('count')
      }, item.count));
    });

    return _this;
  }

  _createClass(HierarchicalMenu, [{
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
      return React.createElement(List, {
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
}(Component);

_defineProperty(HierarchicalMenu, "propTypes", {
  translate: PropTypes.func.isRequired,
  refine: PropTypes.func.isRequired,
  createURL: PropTypes.func.isRequired,
  canRefine: PropTypes.bool.isRequired,
  items: itemsPropType,
  showMore: PropTypes.bool,
  className: PropTypes.string,
  limit: PropTypes.number,
  showMoreLimit: PropTypes.number,
  transformItems: PropTypes.func
});

_defineProperty(HierarchicalMenu, "defaultProps", {
  className: ''
});

export default translatable({
  showMore: function showMore(extended) {
    return extended ? 'Show less' : 'Show more';
  }
})(HierarchicalMenu);