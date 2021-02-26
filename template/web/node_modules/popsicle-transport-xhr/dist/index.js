"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = require("servie/dist/browser");
const common_1 = require("servie/dist/common");
/**
 * XHR responses can indicate a response URL.
 */
class XhrResponse extends browser_1.Response {
    constructor(body, options) {
        super(body, options);
        this.url = options.url;
    }
}
exports.XhrResponse = XhrResponse;
class BlockedRequestError extends Error {
    constructor(request, message) {
        super(message);
        this.request = request;
        this.code = "EBLOCKED";
    }
}
exports.BlockedRequestError = BlockedRequestError;
class InvalidRequestError extends Error {
    constructor(request, message) {
        super(message);
        this.request = request;
        this.code = "EINVALID";
    }
}
exports.InvalidRequestError = InvalidRequestError;
class ConnectionError extends Error {
    constructor(request, message) {
        super(message);
        this.request = request;
        this.code = "EUNAVAILABLE";
    }
}
exports.ConnectionError = ConnectionError;
class CSPError extends Error {
    constructor(request, message) {
        super(message);
        this.request = request;
        this.code = "ECSP";
    }
}
exports.CSPError = CSPError;
class TypeError extends Error {
    constructor(request, message) {
        super(message);
        this.request = request;
        this.code = "ETYPE";
    }
}
exports.TypeError = TypeError;
class AbortError extends Error {
    constructor(request, message) {
        super(message);
        this.request = request;
        this.code = "EABORT";
    }
}
exports.AbortError = AbortError;
/**
 * Forward request over `XMLHttpRequest`.
 */
function transport(options = {}) {
    return function (req) {
        return new Promise(function (resolve, reject) {
            const type = options.type || "arraybuffer";
            const method = req.method.toUpperCase();
            if (req.signal.aborted) {
                return reject(new AbortError(req, "Request has been aborted"));
            }
            // Loading HTTP resources from HTTPS is restricted and uncatchable.
            if (window.location.protocol === "https:" &&
                req.url.startsWith("http:")) {
                return reject(new BlockedRequestError(req, `The connection to "${req.url}" is blocked`));
            }
            // Catch URLs that will cause the request to hang indefinitely in CORS
            // disabled environments, such as Atom Editor.
            if (/^https?\:\/*(?:[~#\\\?;\:]|$)/.test(req.url)) {
                return reject(new InvalidRequestError(req, `Refusing to connect to "${req.url}"`));
            }
            const xhr = new XMLHttpRequest();
            let hasUploadProgress = false;
            function ondone() {
                const res = new XhrResponse(type === "text" ? xhr.responseText : xhr.response, {
                    status: xhr.status === 1223 ? 204 : xhr.status,
                    statusText: xhr.statusText,
                    headers: parseXhrHeaders(xhr.getAllResponseHeaders()),
                    omitDefaultHeaders: true,
                    url: xhr.responseURL
                });
                req.signal.emit("responseStarted");
                req.signal.emit("responseEnded");
                return resolve(res);
            }
            function onerror() {
                return reject(new ConnectionError(req, `Unable to connect to "${req.url}"`));
            }
            xhr.onload = ondone;
            xhr.onabort = ondone;
            xhr.onerror = onerror;
            xhr.onprogress = (e) => {
                req.signal.emit("requestBytes", e.loaded);
            };
            // No upload will occur with these requests.
            if (method !== "GET" && method !== "HEAD" && xhr.upload) {
                hasUploadProgress = true;
                xhr.upload.onprogress = (e) => {
                    req.signal.emit("responseBytes", e.loaded);
                };
                xhr.upload.onloadend = () => {
                    req.signal.emit("requestEnded");
                };
            }
            // XHR can fail to open when site CSP is set.
            try {
                xhr.open(method, req.url);
            }
            catch (err) {
                return reject(new CSPError(req, `Refused to connect to "${req.url}"`));
            }
            // Send cookies with CORS.
            if (options.withCredentials)
                xhr.withCredentials = true;
            // Enable overriding the response MIME handling.
            if (options.overrideMimeType) {
                xhr.overrideMimeType(options.overrideMimeType);
            }
            // Use the passed in type for the response.
            if (type !== "text") {
                try {
                    xhr.responseType = type;
                }
                finally {
                    if (xhr.responseType !== type) {
                        return reject(new TypeError(req, `Unsupported type: ${type}`));
                    }
                }
            }
            for (const [key, value] of req.headers.entries()) {
                if (Array.isArray(value)) {
                    for (const v of value)
                        xhr.setRequestHeader(key, v);
                }
                else {
                    xhr.setRequestHeader(key, value);
                }
            }
            req.signal.emit("requestStarted");
            if (!hasUploadProgress)
                req.signal.emit("requestEnded");
            req.signal.on("abort", () => xhr.abort());
            // Send raw body as-is since it's already best supported.
            xhr.send(common_1.useRawBody(req));
        });
    };
}
exports.transport = transport;
/**
 * Parse a headers string into an array of raw headers.
 */
function parseXhrHeaders(headers) {
    const rawHeaders = [];
    const lines = headers.split(/\r?\n/);
    for (const line of lines) {
        if (line) {
            const indexOf = line.indexOf(":");
            const name = line.substr(0, indexOf).trim();
            const value = line.substr(indexOf + 1).trim();
            rawHeaders.push([name, value]);
        }
    }
    return rawHeaders;
}
//# sourceMappingURL=index.js.map