export declare type HeaderValue = string | string[];
export declare type HeadersObject = Record<string, HeaderValue>;
export declare type HeaderTuple = [string, HeaderValue];
export declare type HeaderValueInput = number | string | Array<number | string>;
export declare type HeadersObjectInput = Record<string, HeaderValueInput | undefined>;
export declare type HeaderTupleInput = [string, HeaderValueInput];
export declare type HeadersInit = Iterable<HeaderTupleInput> | HeadersObjectInput | Headers;
/**
 * Map of HTTP headers.
 */
export declare class Headers {
    object: HeadersObject;
    constructor(init?: HeadersInit);
    set(headerName: string, value: HeaderValueInput): void;
    append(headerName: string, value: HeaderValueInput): void;
    get(headerName: string): string | null;
    getAll(headerName: string): string[];
    has(headerName: string): boolean;
    delete(headerName: string): void;
    entries(): IterableIterator<HeaderTuple>;
    keys(): IterableIterator<string>;
    values(): IterableIterator<HeaderValue>;
    clear(): void;
    asObject(): HeadersObject;
    extend(obj: HeadersInit): void;
    clone(): Headers;
}
