import { Observable } from "./Observable";

export interface UnaryFunction<T, R> {
  (source: T): R;
}

export interface OperatorFunction<T, R>
  extends UnaryFunction<Observable<T>, Observable<R>> {}

export type TeardownLogic = Unsubscribable | Function | void;

export interface Unsubscribable {
  unsubscribe(): void;
}

export interface PartialObserver<T> {
  closed?: boolean;
  next?: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
}
