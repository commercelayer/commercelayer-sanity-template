import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from './Link';

var LinkList =
/*#__PURE__*/
function (_Component) {
  _inherits(LinkList, _Component);

  function LinkList() {
    _classCallCheck(this, LinkList);

    return _possibleConstructorReturn(this, _getPrototypeOf(LinkList).apply(this, arguments));
  }

  _createClass(LinkList, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          cx = _this$props.cx,
          createURL = _this$props.createURL,
          items = _this$props.items,
          onSelect = _this$props.onSelect,
          canRefine = _this$props.canRefine;
      return React.createElement("ul", {
        className: cx('list', !canRefine && 'list--noRefinement')
      }, items.map(function (item) {
        return React.createElement("li", {
          key: item.key === undefined ? item.value : item.key,
          className: cx('item', item.selected && !item.disabled && 'item--selected', item.disabled && 'item--disabled', item.modifier)
        }, item.disabled ? React.createElement("span", {
          className: cx('link')
        }, item.label === undefined ? item.value : item.label) : React.createElement(Link, {
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
}(Component);

_defineProperty(LinkList, "propTypes", {
  cx: PropTypes.func.isRequired,
  createURL: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.node,
    modifier: PropTypes.string,
    ariaLabel: PropTypes.string,
    disabled: PropTypes.bool
  })),
  onSelect: PropTypes.func.isRequired,
  canRefine: PropTypes.bool.isRequired
});

export { LinkList as default };