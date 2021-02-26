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
var cx = createClassNames('HitsPerPage');

var HitsPerPage =
/*#__PURE__*/
function (_Component) {
  _inherits(HitsPerPage, _Component);

  function HitsPerPage() {
    _classCallCheck(this, HitsPerPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(HitsPerPage).apply(this, arguments));
  }

  _createClass(HitsPerPage, [{
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
        onSelect: refine,
        selectedItem: currentRefinement,
        items: items,
        cx: cx
      }));
    }
  }]);

  return HitsPerPage;
}(Component);

_defineProperty(HitsPerPage, "propTypes", {
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string
  })).isRequired,
  currentRefinement: PropTypes.number.isRequired,
  refine: PropTypes.func.isRequired,
  className: PropTypes.string
});

_defineProperty(HitsPerPage, "defaultProps", {
  className: ''
});

export default HitsPerPage;