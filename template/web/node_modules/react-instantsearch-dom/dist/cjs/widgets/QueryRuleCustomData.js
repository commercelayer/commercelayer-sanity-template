"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactInstantsearchCore = require("react-instantsearch-core");

var _PanelCallbackHandler = _interopRequireDefault(require("../components/PanelCallbackHandler"));

var _QueryRuleCustomData = _interopRequireDefault(require("../components/QueryRuleCustomData"));

var QueryRuleCustomDataWidget = function QueryRuleCustomDataWidget(props) {
  return _react.default.createElement(_PanelCallbackHandler.default, props, _react.default.createElement(_QueryRuleCustomData.default, props));
};

var _default = (0, _reactInstantsearchCore.connectQueryRules)(QueryRuleCustomDataWidget);

exports.default = _default;