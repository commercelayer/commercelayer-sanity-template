import * as React from 'react';
declare type UseEffectParams = Parameters<typeof React.useEffect>;
declare type EffectCallback = UseEffectParams[0];
declare type DependencyList = UseEffectParams[1];
declare type UseEffectReturn = ReturnType<typeof React.useEffect>;
declare function useDeepCompareEffect(callback: EffectCallback, dependencies: DependencyList): UseEffectReturn;
export declare function useDeepCompareEffectNoCheck(callback: EffectCallback, dependencies: DependencyList): UseEffectReturn;
export default useDeepCompareEffect;
