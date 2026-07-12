export interface ISnapshotable<T> {
  makeSnapshot(): T;
}
