"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_expect_1 = require("ts-expect");
function test(expectType) {
    return expectType();
}
const test2 = (expectType) => expectType();
function test3(noShadow) {
    ts_expect_1.expectType(123);
    return noShadow;
}
test(ts_expect_1.expectType);
test2(() => undefined);
test3(123);
ts_expect_1.expectType("");
const expectedType = ts_expect_1.expectType;
expectedType("");
//# sourceMappingURL=test-var-shadow.js.map