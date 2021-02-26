import { Request, Response } from "servie/dist/node";
/**
 * Decoding errors.
 */
export declare class EncodingError extends Error {
    response: Response;
    code: string;
    constructor(response: Response, message: string);
}
/**
 * Automatically support decoding compressed HTTP responses.
 */
export declare function contentEncoding<T extends Request, U extends Response>(): (req: T, next: () => Promise<U>) => Promise<U>;
