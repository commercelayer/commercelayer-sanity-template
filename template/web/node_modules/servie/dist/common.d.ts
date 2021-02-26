import { Headers, HeadersInit } from "./headers";
import { Signal } from "./signal";
/**
 * Marker to indicate the body has been used.
 */
export declare const kBodyUsed: unique symbol;
/**
 * Marker to indicate the body has been destroyed and can not be used.
 */
export declare const kBodyDestroyed: unique symbol;
/**
 * Read and "use" the raw body from a `Body` instance.
 */
export declare function useRawBody<T>(body: CommonBody<T>): T | null;
/**
 * Read the raw body from a `Body` instance.
 */
export declare function getRawBody<T>(body: CommonBody<T>): T | null;
/**
 * Support body input types.
 */
export declare type EmptyBody = null | undefined;
/**
 * Body constructor shape.
 */
export declare type CommonBodyConstructor<T, U extends T> = {
    new (body: T | EmptyBody, headers: Headers): CommonBody<U>;
};
/**
 * Abstract body shared between node.js and browsers.
 */
export interface CommonBody<T = unknown> {
    $rawBody: T | null | typeof kBodyUsed | typeof kBodyDestroyed;
    readonly bodyUsed: boolean;
    json(): Promise<any>;
    text(): Promise<string>;
    arrayBuffer(): Promise<ArrayBuffer>;
    clone(): CommonBody<T>;
    destroy(): Promise<void>;
}
/**
 * Request configuration.
 */
export interface CommonRequestOptions<T> {
    method?: string;
    body?: T;
    signal?: Signal;
    headers?: HeadersInit;
    omitDefaultHeaders?: boolean;
    trailer?: HeadersInit | Promise<HeadersInit>;
}
/**
 * Request implementation standard.
 */
export interface CommonRequest<T = unknown> extends CommonBody<T> {
    url: string;
    method: string;
    headers: Headers;
    trailer: Promise<Headers>;
    readonly signal: Signal;
    clone(): CommonRequest<T>;
}
/**
 * Response configuration.
 */
export interface CommonResponseOptions {
    status?: number;
    statusText?: string;
    headers?: HeadersInit;
    omitDefaultHeaders?: boolean;
    trailer?: HeadersInit | Promise<HeadersInit>;
}
/**
 * Response implementation standard.
 */
export interface CommonResponse<T = unknown> extends CommonBody<T> {
    status: number;
    statusText: string;
    headers: Headers;
    trailer: Promise<Headers>;
    clone(): CommonResponse<T>;
}
