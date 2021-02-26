"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("@servie/events");
const byte_length_1 = require("byte-length");
const ts_expect_1 = require("ts-expect");
const headers_1 = require("./headers");
const signal_1 = require("./signal");
const common_1 = require("./common");
__export(require("./headers"));
__export(require("./signal"));
/**
 * Convert array buffer to string.
 */
function arrayBufferToText(buffer) {
    const view = new DataView(buffer);
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(view);
}
/**
 * Convert a string to `Uint8Array`.
 */
function textToUint8Array(text) {
    const encoder = new TextEncoder();
    return encoder.encode(text);
}
/**
 * Convert browser stream to array buffer.
 */
function streamToArrayBuffer(stream) {
    const reader = stream.getReader();
    function next(buffer) {
        return reader.read().then(result => {
            if (result.done)
                return buffer;
            const chunk = result.value;
            const tmpBuffer = new Uint8Array(buffer.byteLength + chunk.byteLength);
            tmpBuffer.set(buffer, 0);
            tmpBuffer.set(chunk, buffer.byteLength);
            return next(tmpBuffer);
        });
    }
    return next(new Uint8Array(0));
}
/**
 * Browser `Body` implementation.
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
        if (rawBody instanceof ArrayBuffer) {
            return Promise.resolve(arrayBufferToText(rawBody));
        }
        return streamToArrayBuffer(rawBody).then(arrayBufferToText);
    }
    arrayBuffer() {
        const rawBody = common_1.useRawBody(this);
        if (rawBody === null)
            return Promise.resolve(new ArrayBuffer(0));
        if (rawBody instanceof ArrayBuffer)
            return Promise.resolve(rawBody);
        if (typeof rawBody === "string") {
            return Promise.resolve(textToUint8Array(rawBody).buffer);
        }
        return streamToArrayBuffer(rawBody);
    }
    readableStream() {
        const rawBody = common_1.useRawBody(this);
        if (rawBody === null) {
            return new ReadableStream({
                start(controller) {
                    controller.close();
                }
            });
        }
        if (typeof rawBody === "string") {
            return new ReadableStream({
                start(controller) {
                    controller.enqueue(textToUint8Array(rawBody));
                    controller.close();
                }
            });
        }
        if (rawBody instanceof ArrayBuffer) {
            return new ReadableStream({
                start(controller) {
                    controller.enqueue(new Uint8Array(rawBody));
                    controller.close();
                }
            });
        }
        return rawBody;
    }
    clone() {
        const rawBody = common_1.getRawBody(this);
        if (rawBody instanceof ReadableStream) {
            const [selfRawBody, clonedRawBody] = rawBody.tee();
            this.$rawBody = selfRawBody;
            return new Body(clonedRawBody);
        }
        return new Body(rawBody);
    }
    destroy() {
        const rawBody = common_1.getRawBody(this);
        this.$rawBody = common_1.kBodyDestroyed;
        // Destroy readable streams.
        if (rawBody instanceof ReadableStream)
            return rawBody.cancel();
        return Promise.resolve();
    }
}
exports.Body = Body;
/**
 * Browser `Request` implementation.
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
 * Browser `Response` implementation.
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
    if (rawBody instanceof ArrayBuffer) {
        if (!omitDefaultHeaders && !headers.has("Content-Length")) {
            headers.set("Content-Length", String(rawBody.byteLength));
        }
        return headers;
    }
    if (rawBody instanceof ReadableStream)
        return headers;
    ts_expect_1.expectType(rawBody);
    throw new TypeError("Unknown body type");
}
//# sourceMappingURL=browser.js.map