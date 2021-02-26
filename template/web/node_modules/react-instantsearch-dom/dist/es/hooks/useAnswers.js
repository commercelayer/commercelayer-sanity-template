import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { instantSearchContext } from 'react-instantsearch-core';
import { createConcurrentSafePromise } from '../lib/createConcurrentSafePromise';
import { debounce } from '../lib/debounce';

function hasReactHooks() {
  // >= 16.8.0
  var _React$version$split$ = React.version.split('.').map(Number),
      _React$version$split$2 = _slicedToArray(_React$version$split$, 2),
      major = _React$version$split$2[0],
      minor = _React$version$split$2[1];

  return major >= 17 || major === 16 && minor >= 8;
}

export default function useAnswers(_ref) {
  var searchClient = _ref.searchClient,
      queryLanguages = _ref.queryLanguages,
      attributesForPrediction = _ref.attributesForPrediction,
      nbHits = _ref.nbHits,
      _ref$renderDebounceTi = _ref.renderDebounceTime,
      renderDebounceTime = _ref$renderDebounceTi === void 0 ? 100 : _ref$renderDebounceTi,
      _ref$searchDebounceTi = _ref.searchDebounceTime,
      searchDebounceTime = _ref$searchDebounceTi === void 0 ? 100 : _ref$searchDebounceTi,
      extraParameters = _objectWithoutProperties(_ref, ["searchClient", "queryLanguages", "attributesForPrediction", "nbHits", "renderDebounceTime", "searchDebounceTime"]);

  if (!hasReactHooks()) {
    throw new Error("`Answers` component and `useAnswers` hook require all React packages to be 16.8.0 or higher.");
  }

  var context = useContext(instantSearchContext);

  var _useState = useState(context.store.getState().widgets.query),
      _useState2 = _slicedToArray(_useState, 2),
      query = _useState2[0],
      setQuery = _useState2[1];

  var _useState3 = useState(context.mainTargetedIndex),
      _useState4 = _slicedToArray(_useState3, 2),
      index = _useState4[0],
      setIndex = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isLoading = _useState6[0],
      setIsLoading = _useState6[1];

  var _useState7 = useState([]),
      _useState8 = _slicedToArray(_useState7, 2),
      hits = _useState8[0],
      setHits = _useState8[1];

  var runConcurrentSafePromise = useMemo(function () {
    return createConcurrentSafePromise();
  }, []);
  var searchIndex = useMemo(function () {
    return searchClient.initIndex(index);
  }, [searchClient, index]);

  if (!searchIndex.findAnswers) {
    throw new Error('`Answers` component and `useAnswers` hook require `algoliasearch` to be 4.8.0 or higher.');
  }

  var debouncedSearch = useMemo(function () {
    return debounce(searchIndex.findAnswers, searchDebounceTime);
  }, [searchIndex]);
  useEffect(function () {
    setIndex(context.mainTargetedIndex);
    return context.store.subscribe(function () {
      var _context$store$getSta = context.store.getState(),
          widgets = _context$store$getSta.widgets;

      setQuery(widgets.query);
    });
  }, [context]);
  var setDebouncedResult = useMemo(function () {
    return debounce(function (result) {
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
    runConcurrentSafePromise(debouncedSearch(query, queryLanguages, _objectSpread({}, extraParameters, {
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

  useEffect(function () {
    fetchAnswers();
  }, [query]);
  return {
    hits: hits,
    isLoading: isLoading
  };
}