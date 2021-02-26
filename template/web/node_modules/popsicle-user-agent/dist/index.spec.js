"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const node_1 = require("servie/dist/node");
describe("popsicle user agent", () => {
    const req = new node_1.Request("http://example.com/");
    it("should use cookie store for requests", async () => {
        const transport = index_1.userAgent();
        const r = req.clone();
        const res = await transport(r, async () => new node_1.Response(null));
        expect(r.headers.get("user-agent")).toMatch("Popsicle");
    });
});
//# sourceMappingURL=index.spec.js.map