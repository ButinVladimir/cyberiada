export interface IAppState {
  updateState(): void;
  startNewState(): Promise<void>;
  serialize(): string;
  deserialize(serializedState: string): Promise<void>;
  fireUiEvents(): void;
}
