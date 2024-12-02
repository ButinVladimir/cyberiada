export interface ISerializeable<T> {
  startNewState(): Promise<void>;
  deserialize(serializedState: T): Promise<void>;
  serialize(): T;
}
