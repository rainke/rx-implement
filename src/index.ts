import { Observable } from "./internal/Observable";
import { map } from "./internal/operators/map";

const ob = new Observable<number>(function(observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
  }, 200);
})
  .pipe(map(x => x * 2))
  .pipe(map(x => x * 3));

const subscriber = ob.subscribe(console.log);
subscriber.next(10);

interface F<T> {
  (value?: T): T;
}

const f: F<any> = x => 3;

f();
