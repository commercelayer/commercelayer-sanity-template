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
exports.fetch = exports.middleware = exports.userAgent = exports.transport = exports.Request = exports.redirects = exports.HttpResponse = exports.cookies = exports.contentEncoding = void 0;
const node_1 = require("servie/dist/node");
Object.defineProperty(exports, "Request", { enumerable: true, get: function () { return node_1.Request; } });
const throwback_1 = require("throwback");
const popsicle_transport_http_1 = require("popsicle-transport-http");
Object.defineProperty(exports, "transport", { enumerable: true, get: function () { return popsicle_transport_http_1.transport; } });
Object.defineProperty(exports, "HttpResponse", { enumerable: true, get: function () { return popsicle_transport_http_1.HttpResponse; } });
const popsicle_cookie_jar_1 = require("popsicle-cookie-jar");
Object.defineProperty(exports, "cookies", { enumerable: true, get: function () { return popsicle_cookie_jar_1.cookies; } });
const popsicle_content_encoding_1 = require("popsicle-content-encoding");
Object.defineProperty(exports, "contentEncoding", { enumerable: true, get: function () { return popsicle_content_encoding_1.contentEncoding; } });
const popsicle_redirects_1 = require("popsicle-redirects");
Object.defineProperty(exports, "redirects", { enumerable: true, get: function () { return popsicle_redirects_1.redirects; } });
const popsicle_user_agent_1 = require("popsicle-user-agent");
Object.defineProperty(exports, "userAgent", { enumerable: true, get: function () { return popsicle_user_agent_1.userAgent; } });
const common_1 = require("./common");
__exportStar(require("./common"), exports);
__exportStar(require("servie/dist/signal"), exports);
__exportStar(require("servie/dist/headers"), exports);
/**
 * Node.js standard middleware stack.
 */
exports.middleware = throwback_1.compose([
    popsicle_user_agent_1.userAgent(),
    popsicle_content_encoding_1.contentEncoding(),
    // Redirects must happen around cookie support.
    popsicle_redirects_1.redirects(throwback_1.compose([popsicle_cookie_jar_1.cookies(), popsicle_transport_http_1.transport()]))
]);
/**
 * Standard node.js fetch interface.
 */
exports.fetch = common_1.toFetch(exports.middleware, node_1.Request);
//# sourceMappingURL=node.js.map