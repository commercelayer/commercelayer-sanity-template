import { Span } from '@opentelemetry/api';
export declare const tracer: import("@opentelemetry/api").Tracer;
export declare function traceFn<T extends (...args: unknown[]) => ReturnType<T>>(span: Span, fn: T): ReturnType<T>;
export declare function traceAsyncFn<T extends (...args: unknown[]) => ReturnType<T>>(span: Span, fn: T): Promise<ReturnType<T>>;
