"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe("popsicle", () => {
    it("should export a fetch and middleware function", () => {
        expect(index_1.fetch).toBeInstanceOf(Function);
        expect(index_1.middleware).toBeInstanceOf(Function);
    });
});
//# sourceMappingURL=index.spec.js.map