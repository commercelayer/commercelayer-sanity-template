import { Compiler, Plugin } from 'webpack';
export declare class NextJsRequireCacheHotReloader implements Plugin {
    prevAssets: any;
    previousOutputPathsWebpack5: Set<string>;
    currentOutputPathsWebpack5: Set<string>;
    apply(compiler: Compiler): void;
}
