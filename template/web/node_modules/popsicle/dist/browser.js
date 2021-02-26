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
exports.fetch = exports.middleware = exports.XhrResponse = exports.transport = exports.Request = void 0;
const browser_1 = require("servie/dist/browser");
Object.defineProperty(exports, "Request", { enumerable: true, get: function () { return browser_1.Request; } });
const popsicle_transport_xhr_1 = require("popsicle-transport-xhr");
Object.defineProperty(exports, "transport", { enumerable: true, get: function () { return popsicle_transport_xhr_1.transport; } });
Object.defineProperty(exports, "XhrResponse", { enumerable: true, get: function () { return popsicle_transport_xhr_1.XhrResponse; } });
const common_1 = require("./common");
__exportStar(require("./common"), exports);
__exportStar(require("servie/dist/signal"), exports);
__exportStar(require("servie/dist/headers"), exports);
/**
 * Browser standard middleware stack.
 */
exports.middleware = popsicle_transport_xhr_1.transport();
/**
 * Standard browser fetch interface.
 */
exports.fetch = common_1.toFetch(exports.middleware, browser_1.Request);
//# sourceMappingURL=browser.js.map