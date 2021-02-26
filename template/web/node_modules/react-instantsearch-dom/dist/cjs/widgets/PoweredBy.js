"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactInstantsearchCore = require("react-instantsearch-core");

var _PoweredBy = _interopRequireDefault(require("../components/PoweredBy"));

/**
 * PoweredBy displays an Algolia logo.
 *
 * Algolia requires that you use this widget if you are on a [community or free plan](https://www.algolia.com/pricing).
 * @name PoweredBy
 * @kind widget
 * @themeKey ais-PoweredBy - the root div of the widget
 * @themeKey ais-PoweredBy-text - the text of the widget
 * @themeKey ais-PoweredBy-link - the link of the logo
 * @themeKey ais-PoweredBy-logo - the logo of the widget
 * @translationKey searchBy - Label value for the powered by
 * @example
 * import React from 'react';
 * import { InstantSearch, PoweredBy } from 'react-instantsearch-dom';
 * import algoliasearch from 'algoliasearch/lite';
 *
 * const searchClient = algoliasearch(
 *   'latency',
 *   '6be0576ff61c053d5f9a3225e2a90f76'
 * );
 *
 * const App = () => (
 *   <InstantSearch
 *     searchClient={searchClient}
 *     indexName="instant_search"
 *   >
 *     <PoweredBy />
 *   </InstantSearch>
 * );
 */
var _default = (0, _reactInstantsearchCore.connectPoweredBy)(_PoweredBy.default);

exports.default = _default;