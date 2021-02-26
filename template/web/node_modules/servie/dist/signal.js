"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("@servie/events");
/**
 * Standard signal used to communicate during `request` processing.
 */
class Signal extends events_1.Emitter {
    constructor() {
        super();
        this.aborted = false;
        // Listen for the abort signal.
        events_1.once(this, "abort", () => (this.aborted = true));
    }
}
exports.Signal = Signal;
/**
 * Fetch abort controller interface.
 */
class AbortController {
    constructor() {
        this.signal = new Signal();
    }
    abort() {
        this.signal.emit("abort");
    }
}
exports.AbortController = AbortController;
//# sourceMappingURL=signal.js.map