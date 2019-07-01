import { PartialObserver } from './types';

export class Subscriber<T> {
  protected isStoped = false;
  catchError: boolean = false;
  constructor(
    observerOrNext: PartialObserver<T> | ((value: T) => void),
    error?: (e?: any) => void,
    complete?: () => void
  ) {
    switch (arguments.length) {
      case 1:
        if (typeof observerOrNext === 'object') {
          this._init(observerOrNext);
        }
        break;
      default:
        if (typeof observerOrNext === 'function') {
          this._next = observerOrNext;
          error && this.setError(error);
          if (complete) this._complete = complete;
        } else if (typeof observerOrNext === 'object') {
          this._init(observerOrNext);
        } else {
          throw Error('空的订阅');
        }
    }
  }

  private _init(observerOrNext: PartialObserver<T>) {
    const { next, error, complete } = observerOrNext;
    if (next) this._next = next;
    error && this.setError(error);
    if (complete) this._complete = complete;
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

  protected _next(value: T): void {}
  protected _error(error: any): void {}
  protected _complete(): void {}
}
