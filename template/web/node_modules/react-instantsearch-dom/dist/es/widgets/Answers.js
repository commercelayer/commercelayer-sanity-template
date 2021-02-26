import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import { createClassNames } from '../core/utils';
import useAnswers from '../hooks/useAnswers';
var cx = createClassNames('Answers');
/* eslint-disable react/prop-types */

function DefaultAnswersComponent(_ref) {
  var isLoading = _ref.isLoading,
      hits = _ref.hits;
  return React.createElement("div", {
    className: cx('', hits.length === 0 && '-empty')
  }, React.createElement("div", {
    className: cx('header')
  }), isLoading ? React.createElement("div", {
    className: cx('loader')
  }) : React.createElement("ul", {
    className: cx('list')
  }, hits.map(function (hit, index) {
    return React.createElement("li", {
      key: index,
      className: cx('item')
    }, JSON.stringify(hit));
  })));
}

export default function Answers(_ref2) {
  var searchClient = _ref2.searchClient,
      queryLanguages = _ref2.queryLanguages,
      attributesForPrediction = _ref2.attributesForPrediction,
      _ref2$nbHits = _ref2.nbHits,
      nbHits = _ref2$nbHits === void 0 ? 1 : _ref2$nbHits,
      renderDebounceTime = _ref2.renderDebounceTime,
      searchDebounceTime = _ref2.searchDebounceTime,
      _ref2$answersComponen = _ref2.answersComponent,
      AnswersComponent = _ref2$answersComponen === void 0 ? DefaultAnswersComponent : _ref2$answersComponen,
      extraParameters = _objectWithoutProperties(_ref2, ["searchClient", "queryLanguages", "attributesForPrediction", "nbHits", "renderDebounceTime", "searchDebounceTime", "answersComponent"]);

  var _useAnswers = useAnswers(_objectSpread({
    searchClient: searchClient,
    queryLanguages: queryLanguages,
    attributesForPrediction: attributesForPrediction,
    nbHits: nbHits,
    renderDebounceTime: renderDebounceTime,
    searchDebounceTime: searchDebounceTime
  }, extraParameters)),
      hits = _useAnswers.hits,
      isLoading = _useAnswers.isLoading;

  return React.createElement(AnswersComponent, {
    hits: hits,
    isLoading: isLoading
  });
}
/* eslint-enable react/prop-types */