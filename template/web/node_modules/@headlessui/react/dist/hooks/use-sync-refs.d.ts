/// <reference types="react" />
export declare function useSyncRefs<TType>(...refs: (React.MutableRefObject<TType> | ((instance: TType) => void) | null)[]): (value: TType) => void;
