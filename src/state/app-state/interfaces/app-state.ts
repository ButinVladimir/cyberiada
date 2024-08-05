export interface IAppState {
  startNewState(): Promise<void>;
  serialize(): string;
  deserialize(serializedState: string): Promise<void>;
}
