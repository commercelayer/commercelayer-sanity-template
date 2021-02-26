import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createClassNames } from '../core/utils';
import Select from './Select';
var cx = createClassNames('SortBy');

var SortBy =
/*#__PURE__*/
function (_Component) {
  _inherits(SortBy, _Component);

  function SortBy() {
    _classCallCheck(this, SortBy);

    return _possibleConstructorReturn(this, _getPrototypeOf(SortBy).apply(this, arguments));
  }

  _createClass(SortBy, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          items = _this$props.items,
          currentRefinement = _this$props.currentRefinement,
          refine = _this$props.refine,
          className = _this$props.className;
      return React.createElement("div", {
        className: classNames(cx(''), className)
      }, React.createElement(Select, {
        cx: cx,
        items: items,
        selectedItem: currentRefinement,
        onSelect: refine
      }));
    }
  }]);

  return SortBy;
}(Component);

_defineProperty(SortBy, "propTypes", {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string.isRequired
  })).isRequired,
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
  className: PropTypes.string
});

_defineProperty(SortBy, "defaultProps", {
  className: ''
});

export default SortBy;