import { IQueue } from './interfaces/queue';

export class Queue<T> implements IQueue<T> {
  private _queue: T[];

  constructor() {
    this._queue = [];
  }

  isEmpty(): boolean {
    return this._queue.length === 0;
  }

  push(value: T): void {
    this._queue.push(value);
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error('Cannot pop element because queue is empty');
    }

    const value: T = this._queue.shift()!;

    return value;
  }
}
