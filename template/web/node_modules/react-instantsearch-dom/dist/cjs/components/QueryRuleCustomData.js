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

var cx = (0, _utils.createClassNames)('QueryRuleCustomData');

var QueryRuleCustomData = function QueryRuleCustomData(_ref) {
  var items = _ref.items,
      className = _ref.className,
      children = _ref.children;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)(cx(''), className)
  }, children({
    items: items
  }));
};

QueryRuleCustomData.propTypes = {
  items: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  className: _propTypes.default.string,
  children: _propTypes.default.func.isRequired
};
var _default = QueryRuleCustomData;
exports.default = _default;