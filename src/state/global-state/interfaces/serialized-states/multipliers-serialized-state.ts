import {
  ICodeBaseSerializedState,
  IComputationalBaseSerializedState,
  IConnectivitySerializedState,
  IRewardsSerializedState,
} from './multipliers';

export interface IMultipliersSerializedState {
  codeBase: ICodeBaseSerializedState;
  computationalBase: IComputationalBaseSerializedState;
  connectivity: IConnectivitySerializedState;
  rewards: IRewardsSerializedState;
}
