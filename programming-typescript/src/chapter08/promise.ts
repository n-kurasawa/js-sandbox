type Executer<T> = (
  resolve: (result: T) => void,
  reject: (error: unknown) => void
) => void;

type State = "pending" | "fulfilled" | "rejected";

export class Promise<T> {
  private state: State = "pending";
  private value: T | undefined;
  private error: unknown;
  private callbacks: Array<{
    onFulfilled?: (value: T) => unknown;
    onRejected?: (error: unknown) => unknown;
    resolve: (value: unknown) => void;
    reject: (error: unknown) => void;
  }> = [];

  constructor(f: Executer<T>) {
    const resolve = (result: T) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = result;
      this.callbacks.forEach((callback) => this.handleCallback(callback));
    };

    const reject = (error: unknown) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.error = error;
      this.callbacks.forEach((callback) => this.handleCallback(callback));
    };

    f(resolve, reject);
  }
  private handleCallback(cb: (typeof this.callbacks)[0]) {
    if (this.state === "fulfilled") {
      if (cb.onFulfilled) {
        try {
          const result = cb.onFulfilled(this.value!);
          if (result instanceof Promise) {
            result.then(cb.resolve).catch(cb.reject);
          } else {
            cb.resolve(result);
          }
        } catch (error) {
          cb.reject(error);
        }
      } else {
        cb.resolve(this.value!);
      }
    } else if (this.state === "rejected") {
      if (cb.onRejected) {
        try {
          const result = cb.onRejected(this.error);
          if (result instanceof Promise) {
            result.then(cb.resolve).catch(cb.reject);
          } else {
            cb.resolve(result); // catch で回復 → resolve
          }
        } catch (e) {
          cb.reject(e);
        }
      } else {
        cb.reject(this.error);
      }
    }
  }

  then<U>(g: (result: T) => Promise<U> | U): Promise<U> {
    return new Promise<U>((resolve, reject) => {
      const cb = {
        onFulfilled: g,
        resolve: resolve as (value: unknown) => void,
        reject,
      };

      if (this.state === "pending") {
        this.callbacks.push(cb);
      } else {
        this.handleCallback(cb);
      }
    });
  }
  catch<U>(g: (error: unknown) => Promise<U> | U): Promise<U> {
    return new Promise<U>((resolve, reject) => {
      const cb = {
        onFulfilled: undefined,
        onRejected: g,
        resolve: resolve as (value: unknown) => void,
        reject,
      };

      if (this.state === "pending") {
        this.callbacks.push(cb);
      } else {
        this.handleCallback(cb);
      }
    });
  }
}
