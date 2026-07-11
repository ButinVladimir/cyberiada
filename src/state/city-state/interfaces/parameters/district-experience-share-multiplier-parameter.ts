import { ISnapshotable } from '@shared/index';
import { IDistrictExperienceShareMultiplierParameterSnapshot } from '../snapshot-states';

export interface IDistrictExperienceShareMultiplierParameter extends ISnapshotable<IDistrictExperienceShareMultiplierParameterSnapshot> {
  value: number;
  recalculate(): void;
  removeAllEventListeners(): void;
}
