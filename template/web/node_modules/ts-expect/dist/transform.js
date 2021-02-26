"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
/**
 * Strip TypeScript expectations from runtime code.
 */
function default_1() {
    function visitor(context, sourceFile) {
        let keywords = new Set();
        return function visit(node) {
            if (ts.isImportDeclaration(node)) {
                const importName = node.moduleSpecifier.getText().slice(1, -1);
                if (importName === "ts-expect" && node.importClause) {
                    const { namedBindings } = node.importClause;
                    if (namedBindings) {
                        ts.forEachChild(namedBindings, (x) => keywords.add(x.getText()));
                    }
                    return node; // Let minifier handle this.
                }
            }
            if (ts.isFunctionLike(node)) {
                const oldKeywords = new Set(keywords);
                // Remove shadowed keywords.
                node.parameters
                    .map((x) => x.name.getText())
                    .filter((x) => keywords.has(x))
                    .forEach((x) => keywords.delete(x));
                const result = ts.visitEachChild(node, visit, context);
                keywords = oldKeywords; // Restore keywords.
                return result;
            }
            if (ts.isCallExpression(node)) {
                if (keywords.has(node.expression.getText())) {
                    return ts.factory.createEmptyStatement();
                }
                const token = node.expression.getFirstToken();
                if (token && keywords.has(token.getText())) {
                    return ts.factory.createEmptyStatement();
                }
                return node;
            }
            return ts.visitEachChild(node, visit, context);
        };
    }
    return function transformer(context) {
        return (sourceFile) => ts.visitNode(sourceFile, visitor(context, sourceFile));
    };
}
exports.default = default_1;
//# sourceMappingURL=transform.js.map