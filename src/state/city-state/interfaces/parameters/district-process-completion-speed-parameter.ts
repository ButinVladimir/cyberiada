import { ISnapshotable } from '@shared/index';
import { IDistrictProcessCompletionSpeedParameterSnapshot } from '../snapshot-states';

export interface IDistrictProcessCompletionSpeedParameter extends ISnapshotable<IDistrictProcessCompletionSpeedParameterSnapshot> {
  value: number;
  recalculate(): void;
  removeAllEventListeners(): void;
}
