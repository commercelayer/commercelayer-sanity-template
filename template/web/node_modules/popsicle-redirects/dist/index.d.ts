import { CommonRequest, CommonResponse } from "servie/dist/common";
/**
 * Add redirect support to servie events.
 */
declare module "servie/dist/signal" {
    interface SignalEvents {
        redirect: [string];
    }
}
/**
 * Maximum redirects error.
 */
export declare class MaxRedirectsError extends Error {
    request: CommonRequest;
    code: string;
    constructor(request: CommonRequest, message: string);
}
/**
 * Redirect confirmation function.
 */
export declare type ConfirmRedirect = <T extends CommonRequest, U extends CommonResponse>(request: T, response: U) => boolean;
/**
 * Middleware function for following HTTP redirects.
 */
export declare function redirects<T extends CommonRequest, U extends CommonResponse>(fn: (req: T, next: () => Promise<U>) => Promise<U>, maxRedirects?: number, confirmRedirect?: ConfirmRedirect): (req: T, next: () => Promise<U>) => Promise<U>;
