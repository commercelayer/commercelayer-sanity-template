"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAnswers;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactInstantsearchCore = require("react-instantsearch-core");

var _createConcurrentSafePromise = require("../lib/createConcurrentSafePromise");

var _debounce = require("../lib/debounce");

function hasReactHooks() {
  // >= 16.8.0
  var _React$version$split$ = _react.default.version.split('.').map(Number),
      _React$version$split$2 = (0, _slicedToArray2.default)(_React$version$split$, 2),
      major = _React$version$split$2[0],
      minor = _React$version$split$2[1];

  return major >= 17 || major === 16 && minor >= 8;
}

function useAnswers(_ref) {
  var searchClient = _ref.searchClient,
      queryLanguages = _ref.queryLanguages,
      attributesForPrediction = _ref.attributesForPrediction,
      nbHits = _ref.nbHits,
      _ref$renderDebounceTi = _ref.renderDebounceTime,
      renderDebounceTime = _ref$renderDebounceTi === void 0 ? 100 : _ref$renderDebounceTi,
      _ref$searchDebounceTi = _ref.searchDebounceTime,
      searchDebounceTime = _ref$searchDebounceTi === void 0 ? 100 : _ref$searchDebounceTi,
      extraParameters = (0, _objectWithoutProperties2.default)(_ref, ["searchClient", "queryLanguages", "attributesForPrediction", "nbHits", "renderDebounceTime", "searchDebounceTime"]);

  if (!hasReactHooks()) {
    throw new Error("`Answers` component and `useAnswers` hook require all React packages to be 16.8.0 or higher.");
  }

  var context = (0, _react.useContext)(_reactInstantsearchCore.instantSearchContext);

  var _useState = (0, _react.useState)(context.store.getState().widgets.query),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      query = _useState2[0],
      setQuery = _useState2[1];

  var _useState3 = (0, _react.useState)(context.mainTargetedIndex),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      index = _useState4[0],
      setIndex = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      isLoading = _useState6[0],
      setIsLoading = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      hits = _useState8[0],
      setHits = _useState8[1];

  var runConcurrentSafePromise = (0, _react.useMemo)(function () {
    return (0, _createConcurrentSafePromise.createConcurrentSafePromise)();
  }, []);
  var searchIndex = (0, _react.useMemo)(function () {
    return searchClient.initIndex(index);
  }, [searchClient, index]);

  if (!searchIndex.findAnswers) {
    throw new Error('`Answers` component and `useAnswers` hook require `algoliasearch` to be 4.8.0 or higher.');
  }

  var debouncedSearch = (0, _react.useMemo)(function () {
    return (0, _debounce.debounce)(searchIndex.findAnswers, searchDebounceTime);
  }, [searchIndex]);
  (0, _react.useEffect)(function () {
    setIndex(context.mainTargetedIndex);
    return context.store.subscribe(function () {
      var _context$store$getSta = context.store.getState(),
          widgets = _context$store$getSta.widgets;

      setQuery(widgets.query);
    });
  }, [context]);
  var setDebouncedResult = (0, _react.useMemo)(function () {
    return (0, _debounce.debounce)(function (result) {
      setIsLoading(false);
      setHits(result.hits);
    }, renderDebounceTime);
  }, [setIsLoading, setHits]);

  var fetchAnswers = function fetchAnswers() {
    if (!query) {
      setIsLoading(false);
      setHits([]);
      return;
    }

    setIsLoading(true);
    runConcurrentSafePromise(debouncedSearch(query, queryLanguages, (0, _objectSpread2.default)({}, extraParameters, {
      nbHits: nbHits,
      attributesForPrediction: attributesForPrediction
    }))).then(function (result) {
      if (!result) {
        // It's undefined when it's debounced.
        return;
      }

      setDebouncedResult(result);
    });
  };

  (0, _react.useEffect)(function () {
    fetchAnswers();
  }, [query]);
  return {
    hits: hits,
    isLoading: isLoading
  };
}