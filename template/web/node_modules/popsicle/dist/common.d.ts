import { Composed } from "throwback";
import { CommonRequest, CommonResponse } from "servie/dist/common";
/**
 * Create a `fetch` like interface from middleware stack.
 */
export declare function toFetch<T extends CommonRequest, U extends CommonResponse, A extends any[]>(middleware: Composed<T, U>, Request: new (...args: A) => T): (...args: A) => Promise<U>;
