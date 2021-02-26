"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizeNodeModules = (path) => {
    return path.substring(path.indexOf("node_modules"));
};
exports.default = normalizeNodeModules;
