import { compilation as CompilationType } from 'webpack';
import { SimpleWebpackError } from './simpleWebpackError';
export declare function getModuleBuildError(compilation: CompilationType.Compilation, input: any): Promise<SimpleWebpackError | false>;
