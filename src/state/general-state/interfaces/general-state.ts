import { AppStateValue } from '../types';
import { IGeneralSerializedState } from './general-serialized-state';

export interface IGeneralState {
  currentState: AppStateValue;
  randomSeed: string;
  startLoadingGame(): void;
  startRunningGame(): void;
  startNewState(): void;
  deserialize(serializedState: IGeneralSerializedState): void;
  serialize(): IGeneralSerializedState;
}
