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
import { createClassNames } from '../core/utils';
import Link from './Link';
var cx = createClassNames('Breadcrumb');
var itemsPropType = PropTypes.arrayOf(PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}));

var Breadcrumb =
/*#__PURE__*/
function (_Component) {
  _inherits(Breadcrumb, _Component);

  function Breadcrumb() {
    _classCallCheck(this, Breadcrumb);

    return _possibleConstructorReturn(this, _getPrototypeOf(Breadcrumb).apply(this, arguments));
  }

  _createClass(Breadcrumb, [{
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
      var rootPath = canRefine ? React.createElement("li", {
        className: cx('item')
      }, React.createElement(Link, {
        className: cx('link'),
        onClick: function onClick() {
          return !rootURL ? refine() : null;
        },
        href: rootURL ? rootURL : createURL()
      }, translate('rootLabel'))) : null;
      var breadcrumb = items.map(function (item, idx) {
        var isLast = idx === items.length - 1;
        return React.createElement("li", {
          className: cx('item', isLast && 'item--selected'),
          key: idx
        }, React.createElement("span", {
          className: cx('separator')
        }, separator), !isLast ? React.createElement(Link, {
          className: cx('link'),
          onClick: function onClick() {
            return refine(item.value);
          },
          href: createURL(item.value)
        }, item.label) : item.label);
      });
      return React.createElement("div", {
        className: classNames(cx('', !canRefine && '-noRefinement'), className)
      }, React.createElement("ul", {
        className: cx('list')
      }, rootPath, breadcrumb));
    }
  }]);

  return Breadcrumb;
}(Component);

_defineProperty(Breadcrumb, "propTypes", {
  canRefine: PropTypes.bool.isRequired,
  createURL: PropTypes.func.isRequired,
  items: itemsPropType,
  refine: PropTypes.func.isRequired,
  rootURL: PropTypes.string,
  separator: PropTypes.node,
  translate: PropTypes.func.isRequired,
  className: PropTypes.string
});

_defineProperty(Breadcrumb, "defaultProps", {
  rootURL: null,
  separator: ' > ',
  className: ''
});

export default translatable({
  rootLabel: 'Home'
})(Breadcrumb);