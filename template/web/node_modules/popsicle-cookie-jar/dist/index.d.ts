import { CookieJar } from "tough-cookie";
import { CommonRequest, CommonResponse } from "servie/dist/common";
/**
 * Export cookie jar support.
 */
export { CookieJar };
/**
 * Read and write cookies with a cookie jar.
 */
export declare function cookies<T extends CommonRequest, U extends CommonResponse>(jar?: CookieJar): (req: T, next: () => Promise<U>) => Promise<U>;
