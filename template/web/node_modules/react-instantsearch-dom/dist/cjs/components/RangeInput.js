"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RawRangeInput = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactInstantsearchCore = require("react-instantsearch-core");

var _utils = require("../core/utils");

var cx = (0, _utils.createClassNames)('RangeInput');

var RawRangeInput =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RawRangeInput, _Component);

  function RawRangeInput(props) {
    var _this;

    (0, _classCallCheck2.default)(this, RawRangeInput);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RawRangeInput).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSubmit", function (e) {
      e.preventDefault();

      _this.props.refine({
        min: _this.state.from,
        max: _this.state.to
      });
    });
    _this.state = _this.normalizeStateForRendering(props);
    return _this;
  }

  (0, _createClass2.default)(RawRangeInput, [{
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
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(cx('', !canRefine && '-noRefinement'), className)
      }, _react.default.createElement("form", {
        className: cx('form'),
        onSubmit: this.onSubmit
      }, _react.default.createElement("input", {
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
      }), _react.default.createElement("span", {
        className: cx('separator')
      }, translate('separator')), _react.default.createElement("input", {
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
      }), _react.default.createElement("button", {
        className: cx('submit'),
        type: "submit"
      }, translate('submit'))));
    }
  }]);
  return RawRangeInput;
}(_react.Component);

exports.RawRangeInput = RawRangeInput;
(0, _defineProperty2.default)(RawRangeInput, "propTypes", {
  canRefine: _propTypes.default.bool.isRequired,
  precision: _propTypes.default.number.isRequired,
  translate: _propTypes.default.func.isRequired,
  refine: _propTypes.default.func.isRequired,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  currentRefinement: _propTypes.default.shape({
    min: _propTypes.default.number,
    max: _propTypes.default.number
  }),
  className: _propTypes.default.string
});
(0, _defineProperty2.default)(RawRangeInput, "defaultProps", {
  currentRefinement: {},
  className: ''
});

var _default = (0, _reactInstantsearchCore.translatable)({
  submit: 'ok',
  separator: 'to'
})(RawRangeInput);

exports.default = _default;