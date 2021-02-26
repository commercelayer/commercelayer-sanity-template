"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Answers;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("../core/utils");

var _useAnswers2 = _interopRequireDefault(require("../hooks/useAnswers"));

var cx = (0, _utils.createClassNames)('Answers');
/* eslint-disable react/prop-types */

function DefaultAnswersComponent(_ref) {
  var isLoading = _ref.isLoading,
      hits = _ref.hits;
  return _react.default.createElement("div", {
    className: cx('', hits.length === 0 && '-empty')
  }, _react.default.createElement("div", {
    className: cx('header')
  }), isLoading ? _react.default.createElement("div", {
    className: cx('loader')
  }) : _react.default.createElement("ul", {
    className: cx('list')
  }, hits.map(function (hit, index) {
    return _react.default.createElement("li", {
      key: index,
      className: cx('item')
    }, JSON.stringify(hit));
  })));
}

function Answers(_ref2) {
  var searchClient = _ref2.searchClient,
      queryLanguages = _ref2.queryLanguages,
      attributesForPrediction = _ref2.attributesForPrediction,
      _ref2$nbHits = _ref2.nbHits,
      nbHits = _ref2$nbHits === void 0 ? 1 : _ref2$nbHits,
      renderDebounceTime = _ref2.renderDebounceTime,
      searchDebounceTime = _ref2.searchDebounceTime,
      _ref2$answersComponen = _ref2.answersComponent,
      AnswersComponent = _ref2$answersComponen === void 0 ? DefaultAnswersComponent : _ref2$answersComponen,
      extraParameters = (0, _objectWithoutProperties2.default)(_ref2, ["searchClient", "queryLanguages", "attributesForPrediction", "nbHits", "renderDebounceTime", "searchDebounceTime", "answersComponent"]);

  var _useAnswers = (0, _useAnswers2.default)((0, _objectSpread2.default)({
    searchClient: searchClient,
    queryLanguages: queryLanguages,
    attributesForPrediction: attributesForPrediction,
    nbHits: nbHits,
    renderDebounceTime: renderDebounceTime,
    searchDebounceTime: searchDebounceTime
  }, extraParameters)),
      hits = _useAnswers.hits,
      isLoading = _useAnswers.isLoading;

  return _react.default.createElement(AnswersComponent, {
    hits: hits,
    isLoading: isLoading
  });
}
/* eslint-enable react/prop-types */