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
const node_1 = require("./node");
describe("node", () => {
    describe("headers", () => {
        it("should init from an array", () => {
            const headers = new node_1.Headers([["Number", 1]]);
            expect(headers.get("Number")).toEqual("1");
            expect(headers.get("Other")).toEqual(null);
        });
        it("should init from an object", () => {
            const headers = new node_1.Headers({
                Number: 1,
                String: "Two",
                Strings: ["One", "Two", "Three"],
                Numbers: [1, 2, 3]
            });
            expect(headers.get("Number")).toEqual("1");
            expect(headers.get("String")).toEqual("Two");
            expect(headers.get("Numbers")).toEqual("1");
            expect(headers.get("Strings")).toEqual("One");
            expect(headers.get("Other")).toEqual(null);
        });
    });
    describe("request", () => {
        it("should contain base properties", () => {
            const req = new node_1.Request("/test");
            expect(req.url).toBe("/test");
            expect(req.headers).toBeInstanceOf(node_1.Headers);
            expect(req.trailer).toBeInstanceOf(Promise); // tslint:disable-line
        });
        describe("headers", () => {
            it("should accept instance of headers", () => {
                const headers = new node_1.Headers([["Test", "1"]]);
                const req = new node_1.Request("/", { headers });
                expect(req.headers).not.toBe(headers);
                expect(req.headers.get("Test")).toEqual("1");
                expect(req.headers.get("Other")).toEqual(null);
            });
            it("should accept a map of headers", () => {
                const req = new node_1.Request("/", {
                    headers: { Test: "1" }
                });
                expect(req.headers.get("Test")).toEqual("1");
                expect(req.headers.get("Other")).toEqual(null);
            });
            it("should initialize default headers", () => {
                const req = new node_1.Request("", {
                    body: "test"
                });
                expect(req.headers.get("Content-Type")).toEqual("text/plain");
                expect(req.headers.get("Content-Length")).toEqual("4");
            });
            it("should skip default header initialization", () => {
                const req = new node_1.Request("/", {
                    body: "test",
                    omitDefaultHeaders: true
                });
                expect(req.headers.get("Content-Length")).toEqual(null);
                const clonedReq = req.clone();
                expect(clonedReq.headers.get("Content-Length")).toEqual(null);
                const initReq = new node_1.Request(req);
                expect(initReq.headers.get("Content-Length")).toEqual(null);
            });
            it("should clone new header instances", () => {
                const req = new node_1.Request("/", {
                    headers: {
                        Test: "true"
                    }
                });
                expect(req.headers.get("test")).toEqual("true");
                const clonedReq = req.clone();
                clonedReq.headers.set("Test", "false");
                expect(req.headers.get("test")).toEqual("true");
                expect(clonedReq.headers.get("test")).toEqual("false");
                const initReq = new node_1.Request(req);
                initReq.headers.set("Test", "false");
                expect(req.headers.get("test")).toEqual("true");
                expect(initReq.headers.get("test")).toEqual("false");
            });
        });
        describe("body", () => {
            it("should allow null bodies to be re-used", () => __awaiter(this, void 0, void 0, function* () {
                const req = new node_1.Request("/", { body: null });
                expect(yield req.text()).toEqual("");
                expect(yield req.text()).toEqual(""); // Second read.
            }));
            it("should allow undefined bodies to be re-used", () => __awaiter(this, void 0, void 0, function* () {
                const req = new node_1.Request("/", { body: undefined });
                expect(yield req.text()).toEqual("");
                expect(yield req.text()).toEqual(""); // Second read.
            }));
            it("should support `ArrayBuffer`", () => __awaiter(this, void 0, void 0, function* () {
                const req = new node_1.Request("/", { body: new ArrayBuffer(0) });
                expect(req.headers.get("Content-Type")).toEqual("application/octet-stream");
                expect(yield req.text()).toEqual("");
            }));
            it("should support `Buffer`", () => __awaiter(this, void 0, void 0, function* () {
                const req = new node_1.Request("/", { body: Buffer.from("test") });
                expect(req.headers.get("Content-Type")).toEqual("application/octet-stream");
                expect(yield req.text()).toEqual("test");
            }));
            it("should support strings", () => __awaiter(this, void 0, void 0, function* () {
                const req = new node_1.Request("/", { body: "test" });
                expect(req.headers.get("Content-Type")).toEqual("text/plain");
                expect(yield req.text()).toEqual("test");
            }));
        });
        it("should be able to clone", () => {
            const req = new node_1.Request("/");
            const reqClone = new node_1.Request(req);
            expect(req).not.toBe(reqClone);
            expect(req.url).toEqual(reqClone.url);
            expect(req.method).toEqual(reqClone.method);
            expect(req.headers).toEqual(reqClone.headers);
            expect(req.$rawBody).toEqual(reqClone.$rawBody);
            const fn = jest.fn();
            reqClone.signal.on("abort", fn);
            req.signal.emit("abort");
            expect(fn).toHaveBeenCalled();
        });
    });
    describe("response", () => {
        it("should create 200 responses by default", () => {
            const res = new node_1.Response(null, { statusText: "Awesome job!" });
            expect(res.status).toBe(200);
            expect(res.ok).toBe(true);
            expect(res.statusText).toBe("Awesome job!");
        });
        it("should create custom status code responses", () => __awaiter(this, void 0, void 0, function* () {
            const res = new node_1.Response("test", { status: 404 });
            expect(res.status).toBe(404);
            expect(res.ok).toBe(false);
            expect(res.statusText).toBe("");
            expect(yield res.text()).toBe("test");
        }));
        it("should be able to clone", () => {
            const res = new node_1.Response(null, { status: 201 });
            const resClone = new node_1.Response(null, res);
            expect(res).not.toBe(resClone);
            expect(res.status).toEqual(resClone.status);
            expect(res.statusText).toEqual(resClone.statusText);
            expect(res.headers).toEqual(resClone.headers);
            expect(res.$rawBody).toEqual(resClone.$rawBody);
        });
    });
});
//# sourceMappingURL=node.spec.js.map