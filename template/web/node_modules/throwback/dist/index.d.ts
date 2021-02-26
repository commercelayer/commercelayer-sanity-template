/**
 * Next function supports optional `ctx` replacement for following middleware.
 */
export declare type Next<T> = () => Promise<T>;
/**
 * Middleware function pattern.
 */
export declare type Middleware<T, U> = (ctx: T, next: Next<U>) => U | Promise<U>;
/**
 * Final function has no `next()`.
 */
export declare type Done<T, U> = (ctx: T) => U | Promise<U>;
/**
 * Composed function signature.
 */
export declare type Composed<T, U> = (ctx: T, done: Done<T, U>) => Promise<U>;
/**
 * Production-mode middleware composition (no errors thrown).
 */
declare function composeMiddleware<T, U>(middleware: Array<Middleware<T, U>>): Composed<T, U>;
/**
 * Compose an array of middleware functions into a single function.
 */
export declare const compose: typeof composeMiddleware;
export {};
