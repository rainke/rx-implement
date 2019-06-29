import { TeardownLogic, OperatorFunction, PartialObserver } from './types';
import { Subscriber } from './Subscriber';

export class Observable<T> {
  constructor(
    private _subscribe: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic
  ) {}

  [Symbol.observable]() {
    return this;
  }
  subscribe(observer?: PartialObserver<T>): Subscriber<T>;
  subscribe(
    next: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscriber<T>;
  subscribe(
    observerOrnext?: PartialObserver<T> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void
  ) {
    const sink =
      observerOrnext instanceof Subscriber
        ? observerOrnext
        : new Subscriber(observerOrnext, error, complete);
    this._subscribe(sink);
    return sink;
  }

  pipe<R>(operation: OperatorFunction<T, R>) {
    return operation(this);
  }
}
