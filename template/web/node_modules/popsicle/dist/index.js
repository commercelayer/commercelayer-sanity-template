"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = exports.fetch = void 0;
const node_1 = require("./node");
__exportStar(require("./common"), exports);
__exportStar(require("servie/dist/signal"), exports);
__exportStar(require("servie/dist/headers"), exports);
exports.fetch = node_1.fetch;
exports.middleware = node_1.middleware;
//# sourceMappingURL=index.js.map