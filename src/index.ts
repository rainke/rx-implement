import { Observable } from './internal/Observable';
import { Subscriber } from './internal/Subscriber';
// import { map } from './internal/operators/map';

// const ob = new Observable<number>(function(observer) {
//   observer.next(1);
//   observer.next(2);
//   observer.next(3);
//   setTimeout(() => {
//     observer.next(4);
//   }, 200);
// }).pipe(
//   map(x => x * 2),
//   map(x => String(x * 3))
// );

// const subscriber = ob.subscribe(console.log, console.log, () => {
//   console.log('complete');
// });

// subscriber.next('10');

const testSubscriber = new Subscriber<number>({
  next: function(x) {
    console.log(x);
  },
  error: function(err) {
    console.log(err);
  }
});

const ob2 = new Observable<number>(function(observer) {
  observer.next(100);
});

ob2.subscribe(testSubscriber);
