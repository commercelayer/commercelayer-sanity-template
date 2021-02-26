"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Marker to indicate the body has been used.
 */
exports.kBodyUsed = Symbol("bodyUsed");
/**
 * Marker to indicate the body has been destroyed and can not be used.
 */
exports.kBodyDestroyed = Symbol("bodyDestroyed");
/**
 * Read and "use" the raw body from a `Body` instance.
 */
function useRawBody(body) {
    const rawBody = getRawBody(body);
    if (rawBody === null)
        return null; // "Unused".
    body.$rawBody = exports.kBodyUsed;
    return rawBody;
}
exports.useRawBody = useRawBody;
/**
 * Read the raw body from a `Body` instance.
 */
function getRawBody(body) {
    const { $rawBody } = body;
    if ($rawBody === exports.kBodyUsed)
        throw new TypeError("Body already used");
    if ($rawBody === exports.kBodyDestroyed)
        throw new TypeError("Body is destroyed");
    return $rawBody;
}
exports.getRawBody = getRawBody;
//# sourceMappingURL=common.js.map