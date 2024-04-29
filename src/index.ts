type _Enum =
  | { [K in string]: K }
  | { [K in string]: unknown };

type PatternMatch<T extends _Enum, R> = {
  [K in keyof T]: T[keyof T] extends K ? () => R : T[keyof T] extends unknown ? (x: T[keyof T]) => R : never;
  // [K in keyof T]: T extends {} ? (...args: any[]) => any : never
};

export class MarcoMatch<T extends _Enum> {
  constructor(private variant: T) {}

  static new<T extends _Enum>(variant: T) {
    return new MarcoMatch(variant);
  }

  caseOf<R>(pattern: PatternMatch<T, R>) {
    const variant = Object.keys(this.variant)[0];
    const value = Object.values(this.variant)[0];
    // @ts-ignore
    return value ? pattern[variant](value) : pattern[variant](value);
  }
}

export type MakeVariant<Tag extends string, Value = undefined> = Value extends undefined ? { [K in Tag]: Tag }
  : { [K in Tag]: Value };

// @ts-ignore
export const MakeEnumValue = <T extends string>(v: T): { [K in T]: `${K}` } => ({ [`${v}`]: v });
