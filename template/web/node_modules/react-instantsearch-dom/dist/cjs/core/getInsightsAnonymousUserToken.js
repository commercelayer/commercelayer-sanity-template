"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getInsightsAnonymousUserToken;
exports.ANONYMOUS_TOKEN_COOKIE_KEY = void 0;
var ANONYMOUS_TOKEN_COOKIE_KEY = '_ALGOLIA';
exports.ANONYMOUS_TOKEN_COOKIE_KEY = ANONYMOUS_TOKEN_COOKIE_KEY;

function getCookie(name) {
  var prefix = "".concat(name, "=");
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];

    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }

    if (cookie.indexOf(prefix) === 0) {
      return cookie.substring(prefix.length, cookie.length);
    }
  }

  return undefined;
}

function getInsightsAnonymousUserToken() {
  return getCookie(ANONYMOUS_TOKEN_COOKIE_KEY);
}