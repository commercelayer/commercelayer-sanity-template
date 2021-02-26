import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translatable } from 'react-instantsearch-core';
import { createClassNames } from '../core/utils';
var cx = createClassNames('RangeInput');
export var RawRangeInput =
/*#__PURE__*/
function (_Component) {
  _inherits(RawRangeInput, _Component);

  function RawRangeInput(props) {
    var _this;

    _classCallCheck(this, RawRangeInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RawRangeInput).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (e) {
      e.preventDefault();

      _this.props.refine({
        min: _this.state.from,
        max: _this.state.to
      });
    });

    _this.state = _this.normalizeStateForRendering(props);
    return _this;
  }

  _createClass(RawRangeInput, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.canRefine && (prevProps.currentRefinement.min !== this.props.currentRefinement.min || prevProps.currentRefinement.max !== this.props.currentRefinement.max)) {
        this.setState(this.normalizeStateForRendering(this.props));
      }
    }
  }, {
    key: "normalizeStateForRendering",
    value: function normalizeStateForRendering(props) {
      var canRefine = props.canRefine,
          rangeMin = props.min,
          rangeMax = props.max;
      var _props$currentRefinem = props.currentRefinement,
          valueMin = _props$currentRefinem.min,
          valueMax = _props$currentRefinem.max;
      return {
        from: canRefine && valueMin !== undefined && valueMin !== rangeMin ? valueMin : '',
        to: canRefine && valueMax !== undefined && valueMax !== rangeMax ? valueMax : ''
      };
    }
  }, {
    key: "normalizeRangeForRendering",
    value: function normalizeRangeForRendering(_ref) {
      var canRefine = _ref.canRefine,
          min = _ref.min,
          max = _ref.max;
      var hasMin = min !== undefined;
      var hasMax = max !== undefined;
      return {
        min: canRefine && hasMin && hasMax ? min : '',
        max: canRefine && hasMin && hasMax ? max : ''
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          from = _this$state.from,
          to = _this$state.to;
      var _this$props = this.props,
          precision = _this$props.precision,
          translate = _this$props.translate,
          canRefine = _this$props.canRefine,
          className = _this$props.className;

      var _this$normalizeRangeF = this.normalizeRangeForRendering(this.props),
          min = _this$normalizeRangeF.min,
          max = _this$normalizeRangeF.max;

      var step = 1 / Math.pow(10, precision);
      return React.createElement("div", {
        className: classNames(cx('', !canRefine && '-noRefinement'), className)
      }, React.createElement("form", {
        className: cx('form'),
        onSubmit: this.onSubmit
      }, React.createElement("input", {
        className: cx('input', 'input--min'),
        type: "number",
        min: min,
        max: max,
        value: from,
        step: step,
        placeholder: min,
        disabled: !canRefine,
        onChange: function onChange(e) {
          return _this2.setState({
            from: e.currentTarget.value
          });
        }
      }), React.createElement("span", {
        className: cx('separator')
      }, translate('separator')), React.createElement("input", {
        className: cx('input', 'input--max'),
        type: "number",
        min: min,
        max: max,
        value: to,
        step: step,
        placeholder: max,
        disabled: !canRefine,
        onChange: function onChange(e) {
          return _this2.setState({
            to: e.currentTarget.value
          });
        }
      }), React.createElement("button", {
        className: cx('submit'),
        type: "submit"
      }, translate('submit'))));
    }
  }]);

  return RawRangeInput;
}(Component);

_defineProperty(RawRangeInput, "propTypes", {
  canRefine: PropTypes.bool.isRequired,
  precision: PropTypes.number.isRequired,
  translate: PropTypes.func.isRequired,
  refine: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  currentRefinement: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }),
  className: PropTypes.string
});

_defineProperty(RawRangeInput, "defaultProps", {
  currentRefinement: {},
  className: ''
});

export default translatable({
  submit: 'ok',
  separator: 'to'
})(RawRangeInput);