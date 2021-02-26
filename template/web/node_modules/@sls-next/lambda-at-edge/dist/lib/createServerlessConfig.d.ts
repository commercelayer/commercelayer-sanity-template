declare type CreateServerlessConfigResult = {
    restoreUserConfig: () => Promise<void>;
};
export default function createServerlessConfig(workPath: string, entryPath: string, useServerlessTraceTarget: boolean): Promise<CreateServerlessConfigResult>;
export {};
