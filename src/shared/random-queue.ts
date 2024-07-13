import { XORShift128Plus } from 'random-seedable';
import { IQueue } from './interfaces/queue';

export class RandomQueue<T> implements IQueue<T> {
  private _queue: T[];
  private _random: XORShift128Plus;

  constructor(random: XORShift128Plus) {
    this._queue = [];
    this._random = random;
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

    const index = this._random.randBelow(this._queue.length);
    const value = this._queue[index];
    this._queue[index] = this._queue[this._queue.length - 1];
    this._queue.pop();

    return value;
  }
}
