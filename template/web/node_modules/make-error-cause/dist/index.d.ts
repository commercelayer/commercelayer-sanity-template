import * as makeError from "make-error";
/**
 * Create a new error instance of `cause` property support.
 */
export declare class BaseError extends makeError.BaseError {
    cause?: Error | undefined;
    constructor(message?: string, cause?: Error | undefined);
}
/**
 * Capture the full stack trace of any error instance.
 */
export declare function fullStack(error: Error | BaseError): string;
//# sourceMappingURL=index.d.ts.map