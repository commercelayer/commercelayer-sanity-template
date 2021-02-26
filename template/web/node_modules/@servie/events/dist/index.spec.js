"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe("tiny events", () => {
    describe("events", () => {
        it("should emit events", () => {
            const events = new index_1.Emitter();
            const spy = jest.fn();
            events.on("test", spy);
            events.emit("test", true);
            events.off("test", spy);
            events.emit("test", false);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenLastCalledWith(true);
        });
        it("should noop when removing unknown listing", () => {
            const events = new index_1.Emitter();
            const fn1 = jest.fn();
            const fn2 = jest.fn();
            expect(events.$.test).toBeUndefined();
            events.off("test", fn1);
            expect(events.$.test).toBeUndefined();
            events.on("test", fn2);
            events.off("test", fn1);
            expect(events.$.test).toEqual([fn2]);
        });
        it("should emit `each` event", () => {
            const events = new index_1.Emitter();
            const spy = jest.fn();
            events.emit("test", false);
            expect(spy).not.toHaveBeenCalled();
            events.each(spy);
            events.emit("test", true);
            expect(spy).toHaveBeenCalledTimes(1);
            events.none(spy);
            events.emit("test", false);
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it("should forward `each` events easily", () => {
            const events1 = new index_1.Emitter();
            const events2 = new index_1.Emitter();
            const spy = jest.fn();
            events2.each(({ type, args }) => {
                events1.emit(type, ...args);
            });
            events1.on("test", spy);
            events2.emit("test", true);
            expect(spy).toHaveBeenLastCalledWith(true);
        });
        it("should filter `each` events easily", () => {
            const events1 = new index_1.Emitter();
            const events2 = new index_1.Emitter();
            const spy = jest.fn();
            events1.each(e => {
                if (e.type === "test") {
                    events2.emit(e.type, ...e.args);
                }
            });
            events2.on("test", spy);
            events1.emit("test", true);
            events1.emit("other", "");
            expect(spy).toHaveBeenLastCalledWith(true);
        });
    });
    describe("once", () => {
        it("should support a once listener", () => {
            const events = new index_1.Emitter();
            const spy = jest.fn();
            index_1.once(events, "test", spy);
            events.emit("test", true);
            events.emit("test", false);
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it("should not break emitter by removing element within listener", () => {
            const events = new index_1.Emitter();
            const onSpy = jest.fn();
            const onceSpy = jest.fn();
            index_1.once(events, "test", onceSpy);
            events.on("test", onSpy);
            events.emit("test", true);
            expect(onSpy).toHaveBeenCalledTimes(1);
            expect(onceSpy).toHaveBeenCalledTimes(1);
        });
    });
});
//# sourceMappingURL=index.spec.js.map