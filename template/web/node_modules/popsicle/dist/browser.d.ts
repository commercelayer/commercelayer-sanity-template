import { Request } from "servie/dist/browser";
import { transport, XhrResponse } from "popsicle-transport-xhr";
export * from "./common";
export * from "servie/dist/signal";
export * from "servie/dist/headers";
/**
 * Expose browser components.
 */
export { Request, transport, XhrResponse };
/**
 * Browser standard middleware stack.
 */
export declare const middleware: (req: Request) => Promise<XhrResponse>;
/**
 * Standard browser fetch interface.
 */
export declare const fetch: (input: string | Request, init?: import("servie/dist/browser").RequestOptions | undefined) => Promise<XhrResponse>;
