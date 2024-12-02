export interface IQueue<T> {
  isEmpty(): boolean;
  push(value: T): void;
  pop(): T;
}
