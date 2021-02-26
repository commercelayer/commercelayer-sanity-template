"use strict";

/* eslint-disable no-empty-function, no-process-env */
var getIt = require('get-it');

var assign = require('object-assign');

var observable = require('get-it/lib/middleware/observable');

var jsonRequest = require('get-it/lib/middleware/jsonRequest');

var jsonResponse = require('get-it/lib/middleware/jsonResponse');

var progress = require('get-it/lib/middleware/progress');

var Observable = require('@sanity/observable/minimal');

var _require = require('./errors'),
    ClientError = _require.ClientError,
    ServerError = _require.ServerError;

var httpError = {
  onResponse: function onResponse(res) {
    if (res.statusCode >= 500) {
      throw new ServerError(res);
    } else if (res.statusCode >= 400) {
      throw new ClientError(res);
    }

    return res;
  }
}; // Environment-specific middleware.

var envSpecific = require('./nodeMiddleware');

var middleware = envSpecific.concat([jsonRequest(), jsonResponse(), progress(), httpError, observable({
  implementation: Observable
})]);
var request = getIt(middleware);

function httpRequest(options) {
  var requester = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : request;
  return requester(assign({
    maxRedirects: 0
  }, options));
}

httpRequest.defaultRequester = request;
httpRequest.ClientError = ClientError;
httpRequest.ServerError = ServerError;
module.exports = httpRequest;