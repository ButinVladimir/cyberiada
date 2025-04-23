import { IMultiplierSerializedState } from './multiplier-serialized-state';

export interface IMultipliersSerializedState {
  codeBase: IMultiplierSerializedState;
  computationalBase: IMultiplierSerializedState;
  connectivity: IMultiplierSerializedState;
  rewards: IMultiplierSerializedState;
}
