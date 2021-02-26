/**
 * Checks that `Value` is assignable to `Target`.
 *
 * ```ts
 * expectType<TypeOf<number, 123>>(true);
 * expectType<TypeOf<123, number>>(false);
 * ```
 */
export declare type TypeOf<Target, Value> = Exclude<Value, Target> extends never ? true : false;
/**
 * Checks that `Value` is equal to the same type as `Target`.
 *
 * ```ts
 * expectType<TypeEqual<123, 123>>(true);
 * expectType<TypeEqual<123, number>>(false);
 * expectType<TypeEqual<number, 123>>(false);
 * expectType<TypeEqual<number, number>>(true);
 * ```
 */
export declare type TypeEqual<Target, Value> = (<T>() => T extends Target ? 1 : 2) extends <T>() => T extends Value ? 1 : 2 ? true : false;
/**
 * Asserts the `value` type is assignable to the generic `Type`.
 *
 * ```ts
 * expectType<number>(123);
 * expectType<boolean>(true);
 * ```
 */
export declare const expectType: <Type>(value: Type) => void;
/**
 * Asserts the `value` type is `never`, i.e. this function should never be called.
 * If it is called at runtime, it will throw a `TypeError`. The return type is
 * `never` to support returning in exhaustive type checks.
 *
 * ```ts
 * return expectNever(value);
 * ```
 */
export declare const expectNever: (value: never) => never;
