"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe("throwback", () => {
    // Run tests on each code path.
    runTests("production");
    runTests("development");
    describe("debug mode", () => {
        it("should select debug mode based on node env by default", () => {
            const fn = index_1.compose([]);
            expect(fn.name).toEqual("composedDebug");
        });
    });
    describe("debug errors", () => {
        it("throw when input is not an array", () => {
            expect(() => index_1.compose("test", true)).toThrow("Expected middleware to be an array, got string");
        });
        it("throw when values are not functions", () => {
            expect(() => index_1.compose([1, 2, 3], true)).toThrow("Expected middleware to contain functions, but got number");
        });
        it("throw when done is not a function", () => {
            const fn = index_1.compose([]);
            expect(() => fn(true)).toThrow("Expected the last argument to be `done(ctx)`, but got undefined");
        });
        it("throw when calling `next()` multiple times", () => __awaiter(this, void 0, void 0, function* () {
            const fn = index_1.compose([
                function (value, next) {
                    return next().then(() => next());
                }
            ]);
            yield expect(fn({}, () => Promise.resolve())).rejects.toEqual(new Error("`next()` called multiple times"));
        }));
        it("should throw if final function attempts to call `next()`", () => __awaiter(this, void 0, void 0, function* () {
            const fn = index_1.compose([]);
            yield expect(fn({}, ((ctx, next) => next()))).rejects.toEqual(new TypeError("Composed `done(ctx)` function should not call `next()`"));
        }));
        it("should throw if function returns `undefined`", () => __awaiter(this, void 0, void 0, function* () {
            const fn = index_1.compose([
                function (ctx) {
                    /* Ignore. */
                }
            ]);
            yield expect(fn(true, () => Promise.resolve())).rejects.toEqual(new TypeError("Expected middleware to return `next()` or a value"));
        }));
    });
});
/**
 * Execute tests in each "mode".
 */
function runTests(nodeEnv) {
    jest.resetModules();
    process.env.NODE_ENV = nodeEnv;
    const { compose } = require('./index');
    describe(`compose middleware with env ${nodeEnv}`, () => {
        it("should select debug mode based on node env by default", () => {
            const fn = compose([]);
            const expectedName = nodeEnv === "production" ? "composed" : "composedDebug";
            expect(fn.name).toEqual(expectedName);
        });
        it("should compose middleware functions", () => __awaiter(this, void 0, void 0, function* () {
            const arr = [];
            const fn = compose([
                function (ctx, next) {
                    arr.push(1);
                    return next().then(value => {
                        arr.push(5);
                        expect(value).toEqual("propagate");
                        return "done";
                    });
                },
                function (ctx, next) {
                    arr.push(2);
                    return next().then(value => {
                        arr.push(4);
                        expect(value).toEqual("hello");
                        return "propagate";
                    });
                }
            ]);
            yield fn({}, () => {
                arr.push(3);
                return "hello";
            });
            expect(arr).toEqual([1, 2, 3, 4, 5]);
        }));
        it("branch middleware by composing", () => __awaiter(this, void 0, void 0, function* () {
            const arr = [];
            const fn = compose([
                compose([
                    function (ctx, next) {
                        arr.push(1);
                        return next().catch(() => {
                            arr.push(3);
                        });
                    },
                    function (ctx, next) {
                        arr.push(2);
                        return Promise.reject(new Error("Boom!"));
                    }
                ]),
                function (ctx, next) {
                    arr.push(4);
                    return next();
                }
            ]);
            yield fn({}, () => undefined);
            expect(arr).toEqual([1, 2, 3]);
        }));
    });
}
//# sourceMappingURL=index.spec.js.map