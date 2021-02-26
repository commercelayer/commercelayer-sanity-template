import { Compiler } from 'webpack';
import { Rewrite } from '../../../lib/load-custom-routes';
export declare type ClientBuildManifest = Record<string, string[]>;
export default class BuildManifestPlugin {
    private buildId;
    private rewrites;
    constructor(options: {
        buildId: string;
        rewrites: Rewrite[];
    });
    createAssets(compilation: any, assets: any): any;
    apply(compiler: Compiler): void;
}
