"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectNever = exports.expectType = void 0;
/**
 * Asserts the `value` type is assignable to the generic `Type`.
 *
 * ```ts
 * expectType<number>(123);
 * expectType<boolean>(true);
 * ```
 */
const expectType = (value) => void 0;
exports.expectType = expectType;
/**
 * Asserts the `value` type is `never`, i.e. this function should never be called.
 * If it is called at runtime, it will throw a `TypeError`. The return type is
 * `never` to support returning in exhaustive type checks.
 *
 * ```ts
 * return expectNever(value);
 * ```
 */
const expectNever = (value) => {
    throw new TypeError("Unexpected value: " + value);
};
exports.expectNever = expectNever;
//# sourceMappingURL=index.js.map