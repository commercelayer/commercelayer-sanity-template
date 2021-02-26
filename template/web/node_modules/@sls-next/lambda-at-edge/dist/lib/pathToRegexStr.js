"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_to_regexp_1 = require("path-to-regexp");
exports.default = (path) => path_to_regexp_1.pathToRegexp(path)
    .toString()
    .replace(/\/(.*)\/\i/, "$1");
