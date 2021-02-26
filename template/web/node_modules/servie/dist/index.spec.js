"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe("index", () => {
    it("is a universal endpoint", () => {
        const req = new index_1.Request("/");
        const res = new index_1.Response(null);
        expect(req).toBeInstanceOf(index_1.Request);
        expect(res).toBeInstanceOf(index_1.Response);
    });
});
//# sourceMappingURL=index.spec.js.map