import { ISnapshotable } from '@shared/index';
import { IExperienceShareSnapshotState } from '../snapshot-states';

export interface IExperienceShareState extends ISnapshotable<IExperienceShareSnapshotState> {
  baseMultiplier: number;
  synchronizationMultiplier: number;
  programMultiplier: number;
  totalMultiplier: number;
  sharedExperience: number;
  resetExperience(): void;
  increaseExperience(delta: number): void;
  recalculate(): void;
}
