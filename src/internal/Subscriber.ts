import { PartialObserver } from './types';

export class Subscriber<T> {
  protected isStoped = false;
  protected destination: PartialObserver<any> | Subscriber<any>;
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
        } else if (observerOrNext) {
          const { next, error, complete } = observerOrNext;
          if (next) this._next = next;
          if (error) this._error = error;
          if (complete) this._complete = complete;
        } else {
          throw Error('空的订阅');
        }
    }
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

// class SafeSubscriber<T> extends Subscriber<T> {
//   constructor(
//     private _parentSubscriber: Subscriber<T>,
//     observerOrNext?: PartialObserver<T> | ((value: T) => void),
//     error?: (e?: any) => void,
//     complete?: () => void
//   ) {
//     super();
//     let next: (value: T) => void;
//     if (typeof observerOrNext === "function") {
//       next = observerOrNext;
//     }
//     this._next = next;
//   }
//   next(value: T): void {
//     this._next(value);
//   }
// }
