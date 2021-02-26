import { Configuration } from 'webpack';
export declare type CompilerResult = {
    errors: string[];
    warnings: string[];
};
export declare function runCompiler(config: Configuration | Configuration[]): Promise<CompilerResult>;
