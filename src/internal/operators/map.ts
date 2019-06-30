import { OperatorFunction } from '../types';
import { Observable } from '../Observable';

export function map<T, R>(project: (value: T, index: number) => R): OperatorFunction<T, R> {
  return function(source) {
    let count = 0;
    return new Observable(function(observer) {
      source.subscribe({
        next: sourceObserver => {
          observer.next(project(sourceObserver, count++));
        },
        complete: () => {
          observer.complete();
        },
        error: err => {
          observer.error(err);
        }
      });
    });
  };
}
