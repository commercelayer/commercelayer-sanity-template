import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { translatable } from 'react-instantsearch-core';
import { createClassNames } from '../core/utils';
var cx = createClassNames('ClearRefinements');

var ClearRefinements =
/*#__PURE__*/
function (_Component) {
  _inherits(ClearRefinements, _Component);

  function ClearRefinements() {
    _classCallCheck(this, ClearRefinements);

    return _possibleConstructorReturn(this, _getPrototypeOf(ClearRefinements).apply(this, arguments));
  }

  _createClass(ClearRefinements, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          items = _this$props.items,
          canRefine = _this$props.canRefine,
          refine = _this$props.refine,
          translate = _this$props.translate,
          className = _this$props.className;
      return React.createElement("div", {
        className: classNames(cx(''), className)
      }, React.createElement("button", {
        className: cx('button', !canRefine && 'button--disabled'),
        onClick: function onClick() {
          return refine(items);
        },
        disabled: !canRefine
      }, translate('reset')));
    }
  }]);

  return ClearRefinements;
}(Component);

_defineProperty(ClearRefinements, "propTypes", {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  canRefine: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  className: PropTypes.string
});

_defineProperty(ClearRefinements, "defaultProps", {
  className: ''
});

export default translatable({
  reset: 'Clear all filters'
})(ClearRefinements);