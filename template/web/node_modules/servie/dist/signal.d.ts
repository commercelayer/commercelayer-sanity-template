import { Emitter } from "@servie/events";
/**
 * Dictionary of supported signal events.
 */
export interface SignalEvents {
    abort: [];
    requestBytes: [number];
    requestEnded: [];
    requestStarted: [];
    responseBytes: [number];
    responseEnded: [];
    responseStarted: [];
}
/**
 * Standard signal used to communicate during `request` processing.
 */
export declare class Signal extends Emitter<SignalEvents> {
    aborted: boolean;
    constructor();
}
/**
 * Fetch abort controller interface.
 */
export declare class AbortController {
    signal: Signal;
    abort(): void;
}
