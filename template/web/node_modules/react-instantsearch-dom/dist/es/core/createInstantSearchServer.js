import _typeof from "@babel/runtime/helpers/esm/typeof";
import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

import React from 'react';
import { renderToString } from 'react-dom/server';
import algoliasearchHelper from 'algoliasearch-helper';
import { version, HIGHLIGHT_TAGS } from 'react-instantsearch-core';

var hasMultipleIndices = function hasMultipleIndices(context) {
  return context && context.multiIndexContext;
};

var getIndexId = function getIndexId(context) {
  return hasMultipleIndices(context) ? context.multiIndexContext.targetedIndex : context.ais.mainTargetedIndex;
};

function createWidgetsCollector(accumulator) {
  return function (_ref) {
    var getSearchParameters = _ref.getSearchParameters,
        getMeta = _ref.getMetadata,
        context = _ref.context,
        props = _ref.props,
        searchState = _ref.searchState;
    accumulator.push({
      getSearchParameters: getSearchParameters,
      getMetadata: getMeta,
      index: getIndexId(context),
      context: context,
      props: props,
      searchState: searchState
    });
  };
}

function getMetadata(widgets) {
  return widgets.filter(function (widget) {
    return widget.getMetadata;
  }).map(function (widget) {
    return widget.getMetadata(widget.props, widget.searchState);
  });
}

var getSearchParameters = function getSearchParameters(indexName, widgets) {
  var sharedParameters = widgets.filter(function (widget) {
    return !hasMultipleIndices(widget.context);
  }).reduce(function (acc, widget) {
    return widget.getSearchParameters(acc, widget.props, widget.searchState);
  }, new algoliasearchHelper.SearchParameters(_objectSpread({}, HIGHLIGHT_TAGS, {
    index: indexName
  })));
  var derivedParameters = widgets.filter(function (widget) {
    return hasMultipleIndices(widget.context);
  }).reduce(function (acc, widget) {
    var indexId = getIndexId(widget.context);
    return _objectSpread({}, acc, _defineProperty({}, indexId, widget.getSearchParameters(acc[indexId] || sharedParameters, widget.props, widget.searchState)));
  }, {});
  return {
    sharedParameters: sharedParameters,
    derivedParameters: derivedParameters
  };
};
/**
 * The engine can return params: "query=xxx&query=yyy" if e.g. a query rule modifies it.
 * This however will cause us to miss the cache hydration, so we make sure to keep
 * only the first query (always the one from the parameters).
 */


function removeDuplicateQuery(params) {
  if (!params) {
    return params;
  }

  var hasFoundQuery = false;
  var queryParamRegex = /&?query=[^&]*/g;
  return params.replace(queryParamRegex, function replacer(match) {
    if (hasFoundQuery) {
      return '';
    }

    hasFoundQuery = true;
    return match;
  });
}

function cleanRawResults(rawResults) {
  return rawResults.map(function (res) {
    return _objectSpread({}, res, {
      params: removeDuplicateQuery(res.params)
    });
  });
}

var singleIndexSearch = function singleIndexSearch(helper, parameters) {
  return helper.searchOnce(parameters).then(function (res) {
    return {
      rawResults: cleanRawResults(res.content._rawResults),
      state: res.content._state
    };
  });
};

var multiIndexSearch = function multiIndexSearch(indexName, client, helper, sharedParameters, _ref2) {
  var mainParameters = _ref2[indexName],
      derivedParameters = _objectWithoutProperties(_ref2, [indexName].map(_toPropertyKey));

  var indexIds = Object.keys(derivedParameters);
  var searches = [helper.searchOnce(_objectSpread({}, sharedParameters, mainParameters))].concat(_toConsumableArray(indexIds.map(function (indexId) {
    var parameters = derivedParameters[indexId];
    return algoliasearchHelper(client, parameters.index).searchOnce(parameters);
  }))); // We attach `indexId` on the results to be able to reconstruct the object
  // on the client side. We cannot rely on `state.index` anymore because we
  // may have multiple times the same index.

  return Promise.all(searches).then(function (results) {
    return [indexName].concat(_toConsumableArray(indexIds)).map(function (indexId, i) {
      return {
        rawResults: cleanRawResults(results[i].content._rawResults),
        state: results[i].content._state,
        _internalIndexId: indexId
      };
    });
  });
};

export var findResultsState = function findResultsState(App, props) {
  if (!props) {
    throw new Error('The function `findResultsState` must be called with props: `findResultsState(App, props)`');
  }

  if (!props.searchClient) {
    throw new Error('The props provided to `findResultsState` must have a `searchClient`');
  }

  if (!props.indexName) {
    throw new Error('The props provided to `findResultsState` must have an `indexName`');
  }

  var indexName = props.indexName,
      searchClient = props.searchClient;
  var widgets = [];
  renderToString(React.createElement(App, _extends({}, props, {
    widgetsCollector: createWidgetsCollector(widgets)
  })));

  if (widgets.length === 0) {
    throw new Error('[ssr]: no widgets were added, you likely did not pass the `widgetsCollector` down to the InstantSearch component.');
  }

  var _getSearchParameters = getSearchParameters(indexName, widgets),
      sharedParameters = _getSearchParameters.sharedParameters,
      derivedParameters = _getSearchParameters.derivedParameters;

  var metadata = getMetadata(widgets);
  var helper = algoliasearchHelper(searchClient, sharedParameters.index);

  if (typeof searchClient.addAlgoliaAgent === 'function') {
    searchClient.addAlgoliaAgent("react-instantsearch-server (".concat(version, ")"));
  }

  if (Object.keys(derivedParameters).length === 0) {
    return singleIndexSearch(helper, sharedParameters).then(function (res) {
      return _objectSpread({
        metadata: metadata
      }, res);
    });
  }

  return multiIndexSearch(indexName, searchClient, helper, sharedParameters, derivedParameters).then(function (results) {
    return {
      metadata: metadata,
      results: results
    };
  });
};