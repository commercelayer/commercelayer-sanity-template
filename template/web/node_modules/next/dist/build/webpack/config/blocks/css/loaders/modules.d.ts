import { AcceptedPlugin } from 'postcss';
import webpack from 'webpack';
import { ConfigurationContext } from '../../../utils';
export declare function getCssModuleLoader(ctx: ConfigurationContext, postCssPlugins: readonly AcceptedPlugin[], preProcessors?: readonly webpack.RuleSetUseItem[]): webpack.RuleSetUseItem[];
