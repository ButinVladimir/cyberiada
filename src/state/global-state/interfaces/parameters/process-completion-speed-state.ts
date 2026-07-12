import { ISnapshotable } from '@shared/index';
import { IProcessCompletionSpeedSnapshotState } from '../snapshot-states';

export interface IProcessCompletionSpeedState extends ISnapshotable<IProcessCompletionSpeedSnapshotState> {
  multiplierByHardware: number;
  multiplierByProgram: number;
  totalMultiplier: number;
  recalculate(): void;
}
