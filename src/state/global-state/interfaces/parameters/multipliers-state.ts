import { ISerializeable, ISnapshotable } from '@shared/index';
import { IMultipliersSerializedState } from '../serialized-states';
import { IMultiplierState } from './multiplier-state';
import { IMultipliersSnapshotState } from '../snapshot-states';

export interface IMultipliersState
  extends ISerializeable<IMultipliersSerializedState>, ISnapshotable<IMultipliersSnapshotState> {
  codeBase: IMultiplierState;
  computationalBase: IMultiplierState;
  recalculate(): void;
}
