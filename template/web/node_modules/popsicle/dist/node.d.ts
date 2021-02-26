import { Request } from "servie/dist/node";
import { transport, HttpResponse } from "popsicle-transport-http";
import { cookies } from "popsicle-cookie-jar";
import { contentEncoding } from "popsicle-content-encoding";
import { redirects } from "popsicle-redirects";
import { userAgent } from "popsicle-user-agent";
export * from "./common";
export * from "servie/dist/signal";
export * from "servie/dist/headers";
/**
 * Expose node.js components.
 */
export { contentEncoding, cookies, HttpResponse, redirects, Request, transport, userAgent };
/**
 * Node.js standard middleware stack.
 */
export declare const middleware: import("throwback").Composed<Request, HttpResponse>;
/**
 * Standard node.js fetch interface.
 */
export declare const fetch: (input: string | Request, init?: import("servie/dist/node").RequestOptions | undefined) => Promise<HttpResponse>;
