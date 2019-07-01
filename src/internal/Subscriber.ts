import { PartialObserver } from './types';

export class Subscriber<T> {
  protected isStoped = false;
  catchError: boolean = false;
  constructor(
    observerOrNext?: PartialObserver<T> | ((value: T) => void),
    error?: (e?: any) => void,
    complete?: () => void
  ) {
    switch (arguments.length) {
      case 0:
      case 1:
        break;
      default:
        if (typeof observerOrNext === 'function') {
          this._next = observerOrNext;
          error && this.setError(error);
          if (complete) this._complete = complete;
        } else if (observerOrNext) {
          const { next, error, complete } = observerOrNext;
          if (next) this._next = next;
          error && this.setError(error);
          if (complete) this._complete = complete;
        } else {
          throw Error('空的订阅');
        }
    }
  }

  private setError(error: (err: any) => void) {
    this._error = error;
    this.catchError = true;
  }
  next(value: T) {
    if (!this.isStoped) this._next(value);
  }

  error(err: any) {
    this._error(err);
    this.unsubscribe();
  }

  complete() {
    this._complete();
    this.unsubscribe();
  }

  unsubscribe() {
    this.isStoped = true;
  }

  _next(value: T): void {}
  _error(error: any): void {}
  _complete(): void {}
}
