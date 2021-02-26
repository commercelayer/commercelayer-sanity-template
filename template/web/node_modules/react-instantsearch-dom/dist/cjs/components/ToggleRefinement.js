"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../core/utils");

var cx = (0, _utils.createClassNames)('ToggleRefinement');

var ToggleRefinement = function ToggleRefinement(_ref) {
  var currentRefinement = _ref.currentRefinement,
      label = _ref.label,
      canRefine = _ref.canRefine,
      refine = _ref.refine,
      className = _ref.className;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)(cx('', !canRefine && '-noRefinement'), className)
  }, _react.default.createElement("label", {
    className: cx('label')
  }, _react.default.createElement("input", {
    className: cx('checkbox'),
    type: "checkbox",
    checked: currentRefinement,
    onChange: function onChange(event) {
      return refine(event.target.checked);
    }
  }), _react.default.createElement("span", {
    className: cx('labelText')
  }, label)));
};

ToggleRefinement.propTypes = {
  currentRefinement: _propTypes.default.bool.isRequired,
  label: _propTypes.default.string.isRequired,
  canRefine: _propTypes.default.bool.isRequired,
  refine: _propTypes.default.func.isRequired,
  className: _propTypes.default.string
};
ToggleRefinement.defaultProps = {
  className: ''
};
var _default = ToggleRefinement;
exports.default = _default;