"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Default `user-agent` header.
 */
exports.DEFAULT_USER_AGENT = "Popsicle (https://github.com/serviejs/popsicle)";
/**
 * Set a `User-Agent` header for every request.
 */
function userAgent(userAgent = exports.DEFAULT_USER_AGENT) {
    return (req, next) => {
        if (!req.headers.has("User-Agent")) {
            req.headers.set("User-Agent", userAgent);
        }
        return next();
    };
}
exports.userAgent = userAgent;
//# sourceMappingURL=index.js.map