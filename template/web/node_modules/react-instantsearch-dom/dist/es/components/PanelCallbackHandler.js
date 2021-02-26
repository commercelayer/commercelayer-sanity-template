import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanelConsumer } from './Panel';

var PanelCallbackHandler =
/*#__PURE__*/
function (_Component) {
  _inherits(PanelCallbackHandler, _Component);

  function PanelCallbackHandler() {
    _classCallCheck(this, PanelCallbackHandler);

    return _possibleConstructorReturn(this, _getPrototypeOf(PanelCallbackHandler).apply(this, arguments));
  }

  _createClass(PanelCallbackHandler, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.setCanRefine(this.props.canRefine);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.canRefine !== this.props.canRefine) {
        this.props.setCanRefine(this.props.canRefine);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return PanelCallbackHandler;
}(Component);

_defineProperty(PanelCallbackHandler, "propTypes", {
  children: PropTypes.node.isRequired,
  canRefine: PropTypes.bool.isRequired,
  setCanRefine: PropTypes.func.isRequired
});

var PanelWrapper = function PanelWrapper(_ref) {
  var canRefine = _ref.canRefine,
      children = _ref.children;
  return React.createElement(PanelConsumer, null, function (setCanRefine) {
    return React.createElement(PanelCallbackHandler, {
      setCanRefine: setCanRefine,
      canRefine: canRefine
    }, children);
  });
};

PanelWrapper.propTypes = {
  canRefine: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};
export default PanelWrapper;