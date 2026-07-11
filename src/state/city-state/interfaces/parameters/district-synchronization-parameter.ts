import { ISnapshotable } from '@shared/index';
import { IDistrictSynchronizationParameterSnapshot } from '../snapshot-states';

export interface IDistrictSynchronizationParameter extends ISnapshotable<IDistrictSynchronizationParameterSnapshot> {
  value: number;
  recalculate(): void;
  removeAllEventListeners(): void;
}
