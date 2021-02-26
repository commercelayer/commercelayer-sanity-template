"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Type-safe event emitter.
 */
class Emitter {
    constructor() {
        this._ = [];
        this.$ = Object.create(null);
    }
    on(type, callback) {
        (this.$[type] = this.$[type] || []).push(callback);
    }
    off(type, callback) {
        const stack = this.$[type];
        if (stack)
            stack.splice(stack.indexOf(callback) >>> 0, 1);
    }
    each(callback) {
        this._.push(callback);
    }
    none(callback) {
        this._.splice(this._.indexOf(callback) >>> 0, 1);
    }
    emit(type, ...args) {
        const stack = this.$[type];
        if (stack)
            stack.slice().forEach(fn => fn(...args));
        this._.slice().forEach(fn => fn({ type, args }));
    }
}
exports.Emitter = Emitter;
/**
 * Helper to listen to an event once only.
 */
function once(events, type, callback) {
    function self(...args) {
        events.off(type, self);
        return callback(...args);
    }
    events.on(type, self);
    return self;
}
exports.once = once;
//# sourceMappingURL=index.js.map