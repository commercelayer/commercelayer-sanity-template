import { CommonRequest, CommonResponse } from "servie/dist/common";
/**
 * Default `user-agent` header.
 */
export declare const DEFAULT_USER_AGENT = "Popsicle (https://github.com/serviejs/popsicle)";
/**
 * Set a `User-Agent` header for every request.
 */
export declare function userAgent<T extends CommonRequest, U extends CommonResponse>(userAgent?: string): (req: T, next: () => Promise<U>) => Promise<U>;
