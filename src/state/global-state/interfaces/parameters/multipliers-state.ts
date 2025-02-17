import { ISerializeable } from '@shared/interfaces/serializable';
import { IMultipliersSerializedState } from '../serialized-states/multipliers-serialized-state';
import { ICodeBaseState, IComputationalBaseState, IConnectivityState, IRewardsState } from './multipliers';

export interface IMultipliersState extends ISerializeable<IMultipliersSerializedState> {
  codeBase: ICodeBaseState;
  computationalBase: IComputationalBaseState;
  connectivity: IConnectivityState;
  rewards: IRewardsState;
  recalculate(): void;
}
