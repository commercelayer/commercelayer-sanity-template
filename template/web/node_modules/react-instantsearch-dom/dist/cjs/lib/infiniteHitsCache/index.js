"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createInfiniteHitsSessionStorageCache", {
  enumerable: true,
  get: function get() {
    return _sessionStorage.default;
  }
});

var _sessionStorage = _interopRequireDefault(require("./sessionStorage"));