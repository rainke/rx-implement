import { TeardownLogic, OperatorFunction, PartialObserver } from './types';
import { Subscriber } from './Subscriber';

export class Observable<T> {
  constructor(
    private _subscribe: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic
  ) {}

  [Symbol.observable]() {
    return this;
  }

  subscribe(
    observerOrNext: PartialObserver<T> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void
  ) {
    const sink =
      observerOrNext instanceof Subscriber
        ? observerOrNext
        : new Subscriber(observerOrNext, error, complete);

    if (sink.catchError) {
      try {
        this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    } else {
      this._subscribe(sink);
    }
    return sink;
  }

  pipe<A>(op: OperatorFunction<T, A>): Observable<A>;
  pipe<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): Observable<B>;
  pipe<A, B, C>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>
  ): Observable<C>;
  pipe<A, B, C, D>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>
  ): Observable<D>;
  pipe<A, B, C, D, E>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>
  ): Observable<E>;
  pipe(...operations: OperatorFunction<any, any>[]) {
    return operations.reduce(function(prev, next) {
      return next(prev);
    }, this);
  }
}
