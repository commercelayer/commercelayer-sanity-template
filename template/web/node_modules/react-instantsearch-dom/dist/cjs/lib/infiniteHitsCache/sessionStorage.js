"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createInfiniteHitsSessionStorageCache;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _reactFastCompare = _interopRequireDefault(require("react-fast-compare"));

function getStateWithoutPage(state) {
  var _ref = state || {},
      page = _ref.page,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["page"]);

  return rest;
}

var KEY = 'ais.infiniteHits';

function hasSessionStorage() {
  return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
}

function createInfiniteHitsSessionStorageCache() {
  return {
    read: function read(_ref2) {
      var state = _ref2.state;

      if (!hasSessionStorage()) {
        return null;
      }

      try {
        var cache = JSON.parse(window.sessionStorage.getItem(KEY));
        return cache && (0, _reactFastCompare.default)(cache.state, getStateWithoutPage(state)) ? cache.hits : null;
      } catch (error) {
        if (error instanceof SyntaxError) {
          try {
            window.sessionStorage.removeItem(KEY);
          } catch (err) {// do nothing
          }
        }

        return null;
      }
    },
    write: function write(_ref3) {
      var state = _ref3.state,
          hits = _ref3.hits;

      if (!hasSessionStorage()) {
        return;
      }

      try {
        window.sessionStorage.setItem(KEY, JSON.stringify({
          state: getStateWithoutPage(state),
          hits: hits
        }));
      } catch (error) {// do nothing
      }
    }
  };
}