"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactInstantsearchCore = require("react-instantsearch-core");

var _VoiceSearch = _interopRequireDefault(require("../components/VoiceSearch"));

var _default = (0, _reactInstantsearchCore.connectVoiceSearch)(_VoiceSearch.default);

exports.default = _default;