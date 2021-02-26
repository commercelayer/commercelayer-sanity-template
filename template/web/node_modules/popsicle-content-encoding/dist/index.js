"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zlib_1 = require("zlib");
/**
 * Decoding errors.
 */
class EncodingError extends Error {
    constructor(response, message) {
        super(message);
        this.response = response;
        this.code = "EINVALIDENCODING";
    }
}
exports.EncodingError = EncodingError;
/**
 * Automatically support decoding compressed HTTP responses.
 */
function contentEncoding() {
    return async function (req, next) {
        if (req.headers.has("Accept-Encoding"))
            return next();
        req.headers.set("Accept-Encoding", zlib_1.createBrotliDecompress ? "gzip, deflate, br" : "gzip, deflate");
        const res = await next();
        const enc = res.headers.get("Content-Encoding");
        // Unzip body automatically when response is encoded.
        if (enc === "deflate" || enc === "gzip") {
            res.$rawBody = res.stream().pipe(zlib_1.createUnzip());
        }
        else if (enc === "br") {
            if (zlib_1.createBrotliDecompress) {
                res.$rawBody = res.stream().pipe(zlib_1.createBrotliDecompress());
            }
            else {
                throw new EncodingError(res, "Unable to support Brotli decoding");
            }
        }
        else if (enc && enc !== "identity") {
            throw new EncodingError(res, `Unable to decode "${enc}" encoding`);
        }
        return res;
    };
}
exports.contentEncoding = contentEncoding;
//# sourceMappingURL=index.js.map