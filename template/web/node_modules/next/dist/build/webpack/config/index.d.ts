import webpack from 'webpack';
export declare function build(config: webpack.Configuration, { rootDirectory, customAppFile, isDevelopment, isServer, assetPrefix, sassOptions, productionBrowserSourceMaps, }: {
    rootDirectory: string;
    customAppFile: string | null;
    isDevelopment: boolean;
    isServer: boolean;
    assetPrefix: string;
    sassOptions: any;
    productionBrowserSourceMaps: boolean;
}): Promise<webpack.Configuration>;
