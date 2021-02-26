"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("@servie/events");
const byte_length_1 = require("byte-length");
const ts_expect_1 = require("ts-expect");
const stream_1 = require("stream");
const headers_1 = require("./headers");
const signal_1 = require("./signal");
const common_1 = require("./common");
__export(require("./headers"));
__export(require("./signal"));
/**
 * Check if a value is a node.js stream object.
 */
function isStream(stream) {
    return (stream !== null &&
        typeof stream === "object" &&
        typeof stream.pipe === "function");
}
/**
 * Convert a node.js `Stream` to `Buffer`.
 */
function streamToBuffer(stream) {
    if (!stream.readable)
        return Promise.resolve(Buffer.alloc(0));
    return new Promise((resolve, reject) => {
        const buf = [];
        const onData = (chunk) => buf.push(chunk);
        const onError = (err) => {
            cleanup();
            return reject(err);
        };
        const onClose = () => {
            cleanup();
            return resolve(Buffer.concat(buf));
        };
        const onEnd = (err) => {
            cleanup();
            if (err)
                return reject(err);
            return resolve(Buffer.concat(buf));
        };
        const cleanup = () => {
            stream.removeListener("error", onError);
            stream.removeListener("data", onData);
            stream.removeListener("close", onClose);
            stream.removeListener("end", onEnd);
        };
        stream.addListener("error", onError);
        stream.addListener("data", onData);
        stream.addListener("close", onClose);
        stream.addListener("end", onEnd);
    });
}
/**
 * Convert a node.js `Buffer` into an `ArrayBuffer` instance.
 */
function bufferToArrayBuffer(buffer) {
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}
/**
 * Node.js `Body` implementation.
 */
class Body {
    constructor(body) {
        const rawBody = body === undefined ? null : body;
        this.$rawBody = rawBody;
    }
    get bodyUsed() {
        return this.$rawBody === common_1.kBodyUsed || this.$rawBody === common_1.kBodyDestroyed;
    }
    json() {
        return this.text().then(x => JSON.parse(x));
    }
    text() {
        const rawBody = common_1.useRawBody(this);
        if (rawBody === null)
            return Promise.resolve("");
        if (typeof rawBody === "string")
            return Promise.resolve(rawBody);
        if (Buffer.isBuffer(rawBody)) {
            return Promise.resolve(rawBody.toString("utf8"));
        }
        if (rawBody instanceof ArrayBuffer) {
            return Promise.resolve(Buffer.from(rawBody).toString("utf8"));
        }
        return streamToBuffer(rawBody).then(x => x.toString("utf8"));
    }
    buffer() {
        const rawBody = common_1.useRawBody(this);
        if (rawBody === null)
            return Promise.resolve(Buffer.allocUnsafe(0));
        if (Buffer.isBuffer(rawBody))
            return Promise.resolve(rawBody);
        if (typeof rawBody === "string") {
            return Promise.resolve(Buffer.from(rawBody));
        }
        if (rawBody instanceof ArrayBuffer) {
            return Promise.resolve(Buffer.from(rawBody));
        }
        return streamToBuffer(rawBody);
    }
    arrayBuffer() {
        return this.buffer().then(bufferToArrayBuffer);
    }
    stream() {
        const rawBody = common_1.useRawBody(this);
        if (isStream(rawBody))
            return rawBody;
        // Push a `Buffer`, string or `null` into the readable stream.
        let value = rawBody instanceof ArrayBuffer ? Buffer.from(rawBody) : rawBody;
        return new stream_1.Readable({
            read() {
                this.push(value);
                value = null; // Force end of stream on next `read`.
            }
        });
    }
    clone() {
        const rawBody = common_1.getRawBody(this);
        if (isStream(rawBody)) {
            const clonedRawBody = rawBody.pipe(new stream_1.PassThrough());
            this.$rawBody = rawBody.pipe(new stream_1.PassThrough());
            return new Body(clonedRawBody);
        }
        return new Body(rawBody);
    }
    destroy() {
        const rawBody = common_1.getRawBody(this);
        this.$rawBody = common_1.kBodyDestroyed;
        // Destroy readable streams.
        if (isStream(rawBody))
            rawBody.destroy();
        return Promise.resolve();
    }
}
exports.Body = Body;
/**
 * Node.js `Request` implementation.
 */
class Request extends Body {
    constructor(input, init = {}) {
        // Clone request or use passed options object.
        const req = typeof input === "string" ? undefined : input.clone();
        const rawBody = init.body || (req ? common_1.getRawBody(req) : null);
        const headers = req && !init.headers
            ? req.headers
            : getDefaultHeaders(rawBody, init.headers, init.omitDefaultHeaders === true);
        super(rawBody);
        this.url = typeof input === "string" ? input : input.url;
        this.method = init.method || (req && req.method) || "GET";
        this.signal = init.signal || (req && req.signal) || new signal_1.Signal();
        this.headers = headers;
        this.trailer =
            req && !init.trailer
                ? req.trailer
                : Promise.resolve(init.trailer).then(x => new headers_1.Headers(x));
        // Destroy body on abort.
        events_1.once(this.signal, "abort", () => this.destroy());
    }
    clone() {
        const cloned = super.clone();
        return new Request(this.url, {
            body: common_1.getRawBody(cloned),
            headers: this.headers.clone(),
            omitDefaultHeaders: true,
            method: this.method,
            signal: this.signal,
            trailer: this.trailer.then(x => x.clone())
        });
    }
}
exports.Request = Request;
/**
 * Node.js `Response` implementation.
 */
class Response extends Body {
    get ok() {
        return this.status >= 200 && this.status < 300;
    }
    constructor(body, init = {}) {
        const headers = getDefaultHeaders(body, init.headers, init.omitDefaultHeaders === true);
        super(body);
        this.status = init.status || 200;
        this.statusText = init.statusText || "";
        this.headers = headers;
        this.trailer = Promise.resolve(init.trailer).then(x => new headers_1.Headers(x));
    }
    clone() {
        const cloned = super.clone();
        return new Response(common_1.getRawBody(cloned), {
            status: this.status,
            statusText: this.statusText,
            headers: this.headers.clone(),
            omitDefaultHeaders: true,
            trailer: this.trailer.then(x => x.clone())
        });
    }
}
exports.Response = Response;
/**
 * Get default headers for `Request` and `Response` instances.
 */
function getDefaultHeaders(rawBody, init, omitDefaultHeaders) {
    const headers = new headers_1.Headers(init);
    if (rawBody === null || rawBody === undefined)
        return headers;
    if (typeof rawBody === "string") {
        if (!omitDefaultHeaders && !headers.has("Content-Type")) {
            headers.set("Content-Type", "text/plain");
        }
        if (!omitDefaultHeaders && !headers.has("Content-Length")) {
            headers.set("Content-Length", byte_length_1.byteLength(rawBody).toString());
        }
        return headers;
    }
    // Default to "octet stream" for raw bodies.
    if (!omitDefaultHeaders && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/octet-stream");
    }
    if (isStream(rawBody)) {
        if (typeof rawBody.getHeaders === "function") {
            headers.extend(rawBody.getHeaders());
        }
        return headers;
    }
    if (rawBody instanceof ArrayBuffer || Buffer.isBuffer(rawBody)) {
        if (!omitDefaultHeaders && !headers.has("Content-Length")) {
            headers.set("Content-Length", String(rawBody.byteLength));
        }
        return headers;
    }
    ts_expect_1.expectType(rawBody);
    throw new TypeError("Unknown body type");
}
//# sourceMappingURL=node.js.map