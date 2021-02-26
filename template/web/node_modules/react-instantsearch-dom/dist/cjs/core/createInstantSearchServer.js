"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findResultsState = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _algoliasearchHelper = _interopRequireDefault(require("algoliasearch-helper"));

var _reactInstantsearchCore = require("react-instantsearch-core");

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return (0, _typeof2.default)(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if ((0, _typeof2.default)(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if ((0, _typeof2.default)(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

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
  }, new _algoliasearchHelper.default.SearchParameters((0, _objectSpread3.default)({}, _reactInstantsearchCore.HIGHLIGHT_TAGS, {
    index: indexName
  })));
  var derivedParameters = widgets.filter(function (widget) {
    return hasMultipleIndices(widget.context);
  }).reduce(function (acc, widget) {
    var indexId = getIndexId(widget.context);
    return (0, _objectSpread3.default)({}, acc, (0, _defineProperty2.default)({}, indexId, widget.getSearchParameters(acc[indexId] || sharedParameters, widget.props, widget.searchState)));
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
    return (0, _objectSpread3.default)({}, res, {
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
      derivedParameters = (0, _objectWithoutProperties2.default)(_ref2, [indexName].map(_toPropertyKey));
  var indexIds = Object.keys(derivedParameters);
  var searches = [helper.searchOnce((0, _objectSpread3.default)({}, sharedParameters, mainParameters))].concat((0, _toConsumableArray2.default)(indexIds.map(function (indexId) {
    var parameters = derivedParameters[indexId];
    return (0, _algoliasearchHelper.default)(client, parameters.index).searchOnce(parameters);
  }))); // We attach `indexId` on the results to be able to reconstruct the object
  // on the client side. We cannot rely on `state.index` anymore because we
  // may have multiple times the same index.

  return Promise.all(searches).then(function (results) {
    return [indexName].concat((0, _toConsumableArray2.default)(indexIds)).map(function (indexId, i) {
      return {
        rawResults: cleanRawResults(results[i].content._rawResults),
        state: results[i].content._state,
        _internalIndexId: indexId
      };
    });
  });
};

var findResultsState = function findResultsState(App, props) {
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
  (0, _server.renderToString)(_react.default.createElement(App, (0, _extends2.default)({}, props, {
    widgetsCollector: createWidgetsCollector(widgets)
  })));

  if (widgets.length === 0) {
    throw new Error('[ssr]: no widgets were added, you likely did not pass the `widgetsCollector` down to the InstantSearch component.');
  }

  var _getSearchParameters = getSearchParameters(indexName, widgets),
      sharedParameters = _getSearchParameters.sharedParameters,
      derivedParameters = _getSearchParameters.derivedParameters;

  var metadata = getMetadata(widgets);
  var helper = (0, _algoliasearchHelper.default)(searchClient, sharedParameters.index);

  if (typeof searchClient.addAlgoliaAgent === 'function') {
    searchClient.addAlgoliaAgent("react-instantsearch-server (".concat(_reactInstantsearchCore.version, ")"));
  }

  if (Object.keys(derivedParameters).length === 0) {
    return singleIndexSearch(helper, sharedParameters).then(function (res) {
      return (0, _objectSpread3.default)({
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

exports.findResultsState = findResultsState;