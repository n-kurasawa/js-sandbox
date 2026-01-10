export interface Option<T> {
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Option<U>): Option<U>;
  getOrElse(value: T): T;
}

export function Option<T>(value: null | undefined): None;
export function Option<T>(value: T): Some<T>;
export function Option<T>(value: T): Option<T> {
  if (value == null) {
    return new None();
  }
  return new Some(value);
}

export class Some<T> implements Option<T> {
  constructor(private value: T) {}

  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Some<U>): Some<U>;
  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value);
  }
  getOrElse(value: T): T {
    return this.value;
  }
}

export class None implements Option<never> {
  flatMap<U>(f: (value: never) => None): None;
  flatMap<U>(f: (value: never) => Option<U>): Option<U>;
  flatMap<U>(): None {
    return this;
  }
  getOrElse<U>(value: U): U {
    return value;
  }
}
