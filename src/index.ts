import { Observable } from './internal/Observable';
import { map } from './internal/operators/map';

const ob = new Observable<number>(function(observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  throw 'xxx';
  setTimeout(() => {
    observer.next(4);
  }, 200);
})
  .pipe(map(x => x * 2))
  .pipe(map(x => x * 3));

const subscriber = ob.subscribe(console.log, console.log, () => {
  console.log('complete');
});

subscriber.next(10);
