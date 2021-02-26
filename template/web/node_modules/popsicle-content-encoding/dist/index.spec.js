"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const node_1 = require("servie/dist/node");
const zlib_1 = require("zlib");
describe("popsicle user agent", () => {
    const req = new node_1.Request("http://example.com/");
    it("should use cookie store for requests", async () => {
        const transport = index_1.contentEncoding();
        const r = req.clone();
        const res = await transport(r, async () => {
            const body = zlib_1.createGzip();
            body.end("Hello world");
            return new node_1.Response(body, {
                headers: {
                    "Content-Encoding": "gzip"
                }
            });
        });
        expect(r.headers.get("accept-encoding")).toMatch("gzip");
        expect(await res.text()).toEqual("Hello world");
    });
});
//# sourceMappingURL=index.spec.js.map