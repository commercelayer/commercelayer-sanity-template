import { Compiler, Plugin } from 'webpack';
export declare type PagesManifest = {
    [page: string]: string;
};
export default class PagesManifestPlugin implements Plugin {
    serverless: boolean;
    constructor(serverless: boolean);
    createAssets(compilation: any, assets: any): void;
    apply(compiler: Compiler): void;
}
