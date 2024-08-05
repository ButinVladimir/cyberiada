import { IGeneralSerializedState } from './general-serialized-state';

export interface IGeneralState {
  randomSeed: number;
  startNewState(): void;
  deserialize(serializedState: IGeneralSerializedState): void;
  serialize(): IGeneralSerializedState;
}
