import { Headers } from "./headers";
import { Signal } from "./signal";
import { CommonBody, EmptyBody, CommonRequestOptions, CommonResponseOptions, CommonResponse, CommonRequest, kBodyUsed, kBodyDestroyed } from "./common";
export declare type RawBody = ReadableStream | ArrayBuffer | string;
export declare type CreateBody = RawBody | EmptyBody;
export declare type RequestOptions = CommonRequestOptions<CreateBody>;
export declare type ResponseOptions = CommonResponseOptions;
export * from "./headers";
export * from "./signal";
/**
 * Browser `Body` implementation.
 */
export declare class Body implements CommonBody<RawBody> {
    $rawBody: RawBody | null | typeof kBodyUsed | typeof kBodyDestroyed;
    constructor(body: CreateBody);
    readonly bodyUsed: boolean;
    json(): Promise<any>;
    text(): Promise<string>;
    arrayBuffer(): Promise<ArrayBuffer>;
    readableStream(): ReadableStream<Uint8Array>;
    clone(): Body;
    destroy(): Promise<void>;
}
/**
 * Browser `Request` implementation.
 */
export declare class Request extends Body implements CommonRequest<RawBody> {
    url: string;
    method: string;
    headers: Headers;
    trailer: Promise<Headers>;
    readonly signal: Signal;
    constructor(input: string | Request, init?: RequestOptions);
    clone(): Request;
}
/**
 * Browser `Response` implementation.
 */
export declare class Response extends Body implements CommonResponse<RawBody> {
    status: number;
    statusText: string;
    headers: Headers;
    trailer: Promise<Headers>;
    readonly ok: boolean;
    constructor(body?: CreateBody, init?: ResponseOptions);
    clone(): Response;
}
