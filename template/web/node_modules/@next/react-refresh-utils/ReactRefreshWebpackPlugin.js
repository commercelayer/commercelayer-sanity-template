"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = require("webpack");
// Shared between webpack 4 and 5:
function injectRefreshFunctions(compilation) {
    const hookVars = compilation.mainTemplate.hooks.localVars;
    hookVars.tap('ReactFreshWebpackPlugin', (source) => webpack_1.Template.asString([
        source,
        '',
        '// noop fns to prevent runtime errors during initialization',
        'if (typeof self !== "undefined") {',
        webpack_1.Template.indent('self.$RefreshReg$ = function () {};'),
        webpack_1.Template.indent('self.$RefreshSig$ = function () {'),
        webpack_1.Template.indent(webpack_1.Template.indent('return function (type) {')),
        webpack_1.Template.indent(webpack_1.Template.indent(webpack_1.Template.indent('return type;'))),
        webpack_1.Template.indent(webpack_1.Template.indent('};')),
        webpack_1.Template.indent('};'),
        '}',
    ]));
}
function webpack4(compiler) {
    // Webpack 4 does not have a method to handle interception of module
    // execution.
    // The closest thing we have to emulating this is mimicking the behavior of
    // `strictModuleExceptionHandling` in `MainTemplate`:
    // https://github.com/webpack/webpack/blob/4c644bf1f7cb067c748a52614500e0e2182b2700/lib/MainTemplate.js#L200
    compiler.hooks.compilation.tap('ReactFreshWebpackPlugin', (compilation) => {
        injectRefreshFunctions(compilation);
        const hookRequire = compilation.mainTemplate.hooks.require;
        // @ts-ignore webpack 5 types compat
        hookRequire.tap('ReactFreshWebpackPlugin', (source) => {
            // Webpack 4 evaluates module code on the following line:
            // ```
            // modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
            // ```
            // https://github.com/webpack/webpack/blob/4c644bf1f7cb067c748a52614500e0e2182b2700/lib/MainTemplate.js#L200
            const lines = source.split('\n');
            // @ts-ignore webpack 5 types compat
            const evalIndex = lines.findIndex((l) => l.includes('modules[moduleId].call('));
            // Unable to find the module execution, that's OK:
            if (evalIndex === -1) {
                return source;
            }
            // Legacy CSS implementations will `eval` browser code in a Node.js
            // context to extract CSS. For backwards compatibility, we need to check
            // we're in a browser context before continuing.
            return webpack_1.Template.asString([
                ...lines.slice(0, evalIndex),
                `
        var hasRefresh = typeof self !== "undefined" && !!self.$RefreshInterceptModuleExecution$;
        var cleanup = hasRefresh
          ? self.$RefreshInterceptModuleExecution$(moduleId)
          : function() {};
        try {
        `,
                lines[evalIndex],
                `
        } finally {
          cleanup();
        }
        `,
                ...lines.slice(evalIndex + 1),
            ]);
        });
    });
}
function webpack5(compiler) {
    class ReactRefreshRuntimeModule extends webpack_1.RuntimeModule {
        constructor() {
            super('react refresh', 5);
        }
        generate() {
            // @ts-ignore This exists in webpack 5
            const { runtimeTemplate } = this.compilation;
            return webpack_1.Template.asString([
                `${webpack_1.RuntimeGlobals.interceptModuleExecution}.push(${runtimeTemplate.basicFunction('options', [
                    `${runtimeTemplate.supportsConst() ? 'const' : 'var'} originalFactory = options.factory;`,
                    `options.factory = ${runtimeTemplate.basicFunction('moduleObject, moduleExports, webpackRequire', [
                        // Legacy CSS implementations will `eval` browser code in a Node.js
                        // context to extract CSS. For backwards compatibility, we need to check
                        // we're in a browser context before continuing.
                        `${runtimeTemplate.supportsConst() ? 'const' : 'var'} hasRefresh = typeof self !== "undefined" && !!self.$RefreshInterceptModuleExecution$;`,
                        `${runtimeTemplate.supportsConst() ? 'const' : 'var'} cleanup = hasRefresh ? self.$RefreshInterceptModuleExecution$(moduleObject.id) : ${runtimeTemplate.supportsArrowFunction()
                            ? '() => {}'
                            : 'function() {}'};`,
                        'try {',
                        webpack_1.Template.indent('originalFactory.call(this, moduleObject, moduleExports, webpackRequire);'),
                        '} finally {',
                        webpack_1.Template.indent(`cleanup();`),
                        '}',
                    ])}`,
                ])})`,
            ]);
        }
    }
    // @ts-ignore webpack 5 types compat
    compiler.hooks.compilation.tap('ReactFreshWebpackPlugin', (compilation) => {
        injectRefreshFunctions(compilation);
        // @ts-ignore Exists in webpack 5
        compilation.hooks.additionalTreeRuntimeRequirements.tap('ReactFreshWebpackPlugin', (chunk) => {
            // @ts-ignore Exists in webpack 5
            compilation.addRuntimeModule(chunk, new ReactRefreshRuntimeModule());
        });
    });
}
class ReactFreshWebpackPlugin {
    apply(compiler) {
        const webpackMajorVersion = parseInt(webpack_1.version !== null && webpack_1.version !== void 0 ? webpack_1.version : '', 10);
        switch (webpackMajorVersion) {
            case 4: {
                webpack4(compiler);
                break;
            }
            case 5: {
                webpack5(compiler);
                break;
            }
            default: {
                throw new Error(`ReactFreshWebpackPlugin does not support webpack v${webpackMajorVersion}.`);
            }
        }
    }
}
exports.default = ReactFreshWebpackPlugin;
//# sourceMappingURL=ReactRefreshWebpackPlugin.js.map