"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe("ts expect", () => {
    it("should expect types", () => {
        index_1.expectType("");
        index_1.expectType(123);
    });
    it("should return void", () => {
        const result = index_1.expectType("");
        expect(result).toEqual(undefined);
    });
    describe("expectNever", () => {
        function doSomething(value) {
            switch (value) {
                case "a":
                    return true;
                case "b":
                    return true;
                default:
                    return index_1.expectNever(value);
            }
        }
        it("should support exhaustive check", () => {
            index_1.expectType(true);
        });
        it("should throw if called", () => {
            expect(index_1.expectNever).toThrowError(TypeError);
        });
    });
    describe("TypeOf", () => {
        it("should support type of checks", () => {
            index_1.expectType(true);
            index_1.expectType(false);
            index_1.expectType(true);
            index_1.expectType(false);
        });
    });
    describe("TypeEqual", () => {
        it("should check types are equal", () => {
            index_1.expectType(true);
            index_1.expectType(false);
            index_1.expectType(false);
            index_1.expectType(true);
            index_1.expectType(false);
            index_1.expectType(false);
            index_1.expectType(false);
            index_1.expectType(true);
            index_1.expectType(true);
        });
        it("should check for `any` type", () => {
            index_1.expectType(false);
            index_1.expectType(false);
            index_1.expectType(false);
            index_1.expectType(false);
            index_1.expectType(false);
            index_1.expectType(false);
            index_1.expectType(true);
            index_1.expectType(true);
        });
    });
});
//# sourceMappingURL=index.spec.js.map