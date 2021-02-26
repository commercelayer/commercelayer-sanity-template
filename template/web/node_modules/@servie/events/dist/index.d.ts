/**
 * Valid event listener args.
 */
export declare type ValidArgs<T> = T extends any[] ? T : never;
/**
 * Event listener type.
 */
export declare type EventListener<T, K extends keyof T> = (...args: ValidArgs<T[K]>) => void;
/**
 * Valid `each` listener args.
 */
export declare type EachValidArgs<T> = {
    [K in keyof T]: {
        type: K;
        args: ValidArgs<T[K]>;
    };
}[keyof T];
/**
 * Wildcard event listener type.
 */
export declare type EachEventListener<T> = (arg: EachValidArgs<T>) => void;
/**
 * Type-safe event emitter.
 */
export declare class Emitter<T> {
    _: Array<EachEventListener<T>>;
    $: {
        [K in keyof T]?: Array<EventListener<T, K>>;
    };
    on<K extends keyof T>(type: K, callback: EventListener<T, K>): void;
    off<K extends keyof T>(type: K, callback: EventListener<T, K>): void;
    each(callback: EachEventListener<T>): void;
    none(callback: EachEventListener<T>): void;
    emit<K extends keyof T>(type: K, ...args: ValidArgs<T[K]>): void;
}
/**
 * Helper to listen to an event once only.
 */
export declare function once<T, K extends keyof T>(events: Emitter<T>, type: K, callback: EventListener<T, K>): (...args: ValidArgs<T[K]>) => void;
