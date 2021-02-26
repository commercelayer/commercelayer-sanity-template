"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFetch = void 0;
/**
 * Create a `fetch` like interface from middleware stack.
 */
function toFetch(middleware, Request) {
    function done() {
        throw new TypeError("Invalid middleware stack, missing transport function");
    }
    return function fetch(...args) {
        const req = args.length === 1 && args[0] instanceof Request
            ? args[0]
            : new Request(...args);
        return middleware(req, done);
    };
}
exports.toFetch = toFetch;
//# sourceMappingURL=common.js.map