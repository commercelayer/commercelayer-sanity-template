import { Compiler } from 'webpack';
import { FontManifest } from '../../../next-server/server/font-utils';
export declare class FontStylesheetGatheringPlugin {
    compiler?: Compiler;
    gatheredStylesheets: Array<string>;
    manifestContent: FontManifest;
    private parserHandler;
    apply(compiler: Compiler): void;
}
