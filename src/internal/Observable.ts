import { TeardownLogic, OperatorFunction, PartialObserver } from './types';
import { Subscriber } from './Subscriber';

export class Observable<T> {
  constructor(
    private _subscribe: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic
  ) {}

  [Symbol.observable]() {
    return this;
  }
  // subscribe(observer?: PartialObserver<T>): Subscriber<T>;
  // subscribe(
  //   next: (value: T) => void,
  //   error?: (error: any) => void,
  //   complete?: () => void
  // ): Subscriber<T>;
  subscribe(
    observerOrNext?: PartialObserver<T> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void
  ) {
    const sink =
      observerOrNext instanceof Subscriber
        ? observerOrNext
        : new Subscriber(observerOrNext, error, complete);
    try {
      this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
    return sink;
  }

  pipe<R>(operation: OperatorFunction<T, R>) {
    return operation(this);
  }
}
