import { ISnapshotable } from '@shared/index';
import { ISynchronizationSnapshotState } from '../snapshot-states';

export interface ISynchronizationState extends ISnapshotable<ISynchronizationSnapshotState> {
  baseValue: number;
  availableValue: number;
  totalValue: number;
  recalculate(): void;
}
