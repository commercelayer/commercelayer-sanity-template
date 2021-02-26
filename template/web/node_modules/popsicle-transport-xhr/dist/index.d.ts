import { Request, Response, ResponseOptions, CreateBody } from "servie/dist/browser";
/**
 * Extend response with URL.
 */
export interface XhrResponseOptions extends ResponseOptions {
    url: string;
}
/**
 * XHR responses can indicate a response URL.
 */
export declare class XhrResponse extends Response implements XhrResponseOptions {
    url: string;
    constructor(body: CreateBody, options: XhrResponseOptions);
}
/**
 * Valid XHR configuration.
 */
export interface TransportOptions {
    type?: XMLHttpRequestResponseType;
    withCredentials?: boolean;
    overrideMimeType?: string;
}
export declare class BlockedRequestError extends Error {
    request: Request;
    code: string;
    constructor(request: Request, message: string);
}
export declare class InvalidRequestError extends Error {
    request: Request;
    code: string;
    constructor(request: Request, message: string);
}
export declare class ConnectionError extends Error {
    request: Request;
    code: string;
    constructor(request: Request, message: string);
}
export declare class CSPError extends Error {
    request: Request;
    code: string;
    constructor(request: Request, message: string);
}
export declare class TypeError extends Error {
    request: Request;
    code: string;
    constructor(request: Request, message: string);
}
export declare class AbortError extends Error {
    request: Request;
    code: string;
    constructor(request: Request, message: string);
}
/**
 * Forward request over `XMLHttpRequest`.
 */
export declare function transport(options?: TransportOptions): (req: Request) => Promise<XhrResponse>;
