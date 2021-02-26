import { middleware as nodeMiddleware, fetch as nodeFetch, HttpResponse } from "./node";
import { middleware as browserMiddleware, fetch as browserFetch, XhrResponse } from "./browser";
export * from "./common";
export * from "servie/dist/signal";
export * from "servie/dist/headers";
export declare const fetch: (...args: Parameters<typeof nodeFetch> & Parameters<typeof browserFetch>) => Promise<XhrResponse | HttpResponse>;
export declare const middleware: typeof nodeMiddleware | typeof browserMiddleware;
