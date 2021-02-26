"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Debug mode wrapper for middleware functions.
 */
function debugMiddleware(middleware) {
    if (!Array.isArray(middleware)) {
        throw new TypeError(`Expected middleware to be an array, got ${typeof middleware}`);
    }
    for (const fn of middleware) {
        if (typeof fn !== "function") {
            // tslint:disable-line
            throw new TypeError(`Expected middleware to contain functions, but got ${typeof fn}`);
        }
    }
    return function composedDebug(ctx, done) {
        if (typeof done !== "function") {
            // tslint:disable-line
            throw new TypeError(`Expected the last argument to be \`done(ctx)\`, but got ${typeof done}`);
        }
        let index = 0;
        function dispatch(pos) {
            const fn = middleware[pos] || done;
            index = pos;
            return new Promise(resolve => {
                const result = fn(ctx, function next() {
                    if (pos < index) {
                        throw new TypeError("`next()` called multiple times");
                    }
                    if (pos > middleware.length) {
                        throw new TypeError("Composed `done(ctx)` function should not call `next()`");
                    }
                    return dispatch(pos + 1);
                });
                if (result === undefined) {
                    // tslint:disable-line
                    throw new TypeError("Expected middleware to return `next()` or a value");
                }
                return resolve(result);
            });
        }
        return dispatch(index);
    };
}
/**
 * Production-mode middleware composition (no errors thrown).
 */
function composeMiddleware(middleware) {
    function dispatch(pos, ctx, done) {
        const fn = middleware[pos] || done;
        return new Promise(resolve => {
            return resolve(fn(ctx, function next() {
                return dispatch(pos + 1, ctx, done);
            }));
        });
    }
    return function composed(ctx, done) {
        return dispatch(0, ctx, done);
    };
}
/**
 * Compose an array of middleware functions into a single function.
 */
exports.compose = process.env.NODE_ENV === "production" ? composeMiddleware : debugMiddleware;
//# sourceMappingURL=index.js.map