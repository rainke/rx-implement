import { TeardownLogic, OperatorFunction } from "./types";
import { Subscriber } from "./Subscriber";

export class Observable<T> {
  constructor(
    private _subscribe: (
      this: Observable<T>,
      subscriber: Subscriber<T>
    ) => TeardownLogic
  ) {}

  [Symbol.observable]() {
    return this;
  }

  subscribe(observer?: (value: T) => void) {
    const sink = new Subscriber(observer);
    this._subscribe(sink);
    return sink;
  }

  pipe<R>(operation: OperatorFunction<T, R>) {
    return operation(this);
  }
}
