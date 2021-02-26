import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createClassNames } from '../core/utils';
var cx = createClassNames('Panel');

var _createContext = createContext(function setCanRefine() {}),
    PanelConsumer = _createContext.Consumer,
    PanelProvider = _createContext.Provider;

export { PanelConsumer, PanelProvider };

var Panel =
/*#__PURE__*/
function (_Component) {
  _inherits(Panel, _Component);

  function Panel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Panel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Panel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      canRefine: true
    });

    _defineProperty(_assertThisInitialized(_this), "setCanRefine", function (nextCanRefine) {
      _this.setState({
        canRefine: nextCanRefine
      });
    });

    return _this;
  }

  _createClass(Panel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          header = _this$props.header,
          footer = _this$props.footer;
      var canRefine = this.state.canRefine;
      return React.createElement("div", {
        className: classNames(cx('', !canRefine && '-noRefinement'), className)
      }, header && React.createElement("div", {
        className: cx('header')
      }, header), React.createElement("div", {
        className: cx('body')
      }, React.createElement(PanelProvider, {
        value: this.setCanRefine
      }, children)), footer && React.createElement("div", {
        className: cx('footer')
      }, footer));
    }
  }]);

  return Panel;
}(Component);

_defineProperty(Panel, "propTypes", {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.node
});

_defineProperty(Panel, "defaultProps", {
  className: '',
  header: null,
  footer: null
});

export default Panel;