"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("../core/utils");

var _Highlighter = _interopRequireDefault(require("./Highlighter"));

var cx = (0, _utils.createClassNames)('Snippet');

var Snippet = function Snippet(props) {
  return _react.default.createElement(_Highlighter.default, (0, _extends2.default)({}, props, {
    highlightProperty: "_snippetResult",
    cx: cx
  }));
};

var _default = Snippet;
exports.default = _default;