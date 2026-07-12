import { ISnapshotable } from '@shared/index';
import { IDistrictInfluenceSerializedParameter } from '../serialized-states';
import { IDistrictInfluenceParameterSnapshot } from '../snapshot-states';

export interface IDistrictInfluenceParameter extends ISnapshotable<IDistrictInfluenceParameterSnapshot> {
  tier: number;
  points: number;
  increasePoints(delta: number): void;
  getTierRequirements(tier: number): number;
  recalculate(): void;
  serialize(): IDistrictInfluenceSerializedParameter;
  deserialize(serializedParameter: IDistrictInfluenceSerializedParameter): void;
  removeAllEventListeners(): void;
}
