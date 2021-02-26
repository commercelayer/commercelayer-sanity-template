import { Compiler, compilation as CompilationType, Plugin } from 'webpack';
export declare const ampFirstEntryNamesMap: WeakMap<CompilationType.Compilation, string[]>;
export declare class DropClientPage implements Plugin {
    ampPages: Set<unknown>;
    apply(compiler: Compiler): void;
}
