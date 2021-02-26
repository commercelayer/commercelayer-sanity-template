"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const path_1 = require("path");
const transform_1 = require("./transform");
const fs_1 = require("fs");
describe("transform", () => {
    const paths = [
        path_1.join(__dirname, "__fixtures__/test-var-shadow.ts"),
        path_1.join(__dirname, "__fixtures__/test-import-spread.ts"),
        path_1.join(__dirname, "__fixtures__/test-import-star.ts"),
    ];
    it("should strip expects", () => {
        const host = ts.createCompilerHost({});
        const program = ts.createProgram(paths, {}, host);
        const result = program.emit(undefined, undefined, undefined, undefined, {
            before: [transform_1.default()],
        });
        expect(result.diagnostics).toEqual([]);
        for (const path of paths) {
            const outPath = path.replace(/\.ts$/, ".js");
            expect(fs_1.readFileSync(outPath, "utf8")).toMatchSnapshot();
        }
    });
});
//# sourceMappingURL=transform.spec.js.map