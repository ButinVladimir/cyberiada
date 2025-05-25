import { ISerializeable } from '@shared/interfaces/serializable';
import { IMultipliersSerializedState } from '../serialized-states/multipliers-serialized-state';
import { IMultiplierState } from './multiplier-state';

export interface IMultipliersState extends ISerializeable<IMultipliersSerializedState> {
  codeBase: IMultiplierState;
  computationalBase: IMultiplierState;
  rewards: IMultiplierState;
  recalculate(): void;
}
