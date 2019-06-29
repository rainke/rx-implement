export class Subscriber<T> {
  protected isStoped = false;
  constructor(private _observer: (value: T) => void) {}
  next(value: T) {
    if (!this.isStoped) this._observer(value);
  }

  unsubscribe() {
    this.isStoped = true;
  }
}
