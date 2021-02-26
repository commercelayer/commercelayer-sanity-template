import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createClassNames } from '../core/utils';
var cx = createClassNames('ScrollTo');

var ScrollTo =
/*#__PURE__*/
function (_Component) {
  _inherits(ScrollTo, _Component);

  function ScrollTo() {
    _classCallCheck(this, ScrollTo);

    return _possibleConstructorReturn(this, _getPrototypeOf(ScrollTo).apply(this, arguments));
  }

  _createClass(ScrollTo, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          value = _this$props.value,
          hasNotChanged = _this$props.hasNotChanged;

      if (value !== prevProps.value && hasNotChanged) {
        this.el.scrollIntoView();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return React.createElement("div", {
        ref: function ref(_ref) {
          return _this.el = _ref;
        },
        className: cx('')
      }, this.props.children);
    }
  }]);

  return ScrollTo;
}(Component);

_defineProperty(ScrollTo, "propTypes", {
  value: PropTypes.any,
  children: PropTypes.node,
  hasNotChanged: PropTypes.bool
});

export default ScrollTo;