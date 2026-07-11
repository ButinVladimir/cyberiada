import { ISnapshotable } from '@shared/index';
import { IDistrictRewardsSerializedParameter } from '../serialized-states';
import { IDistrictRewardsParameterSnapshot } from '../snapshot-states';

export interface IDistrictRewardsParameter extends ISnapshotable<IDistrictRewardsParameterSnapshot> {
  points: number;
  totalMultiplier: number;
  increasePoints(delta: number): void;
  recalculate(): void;
  serialize(): IDistrictRewardsSerializedParameter;
  deserialize(serializedParameter: IDistrictRewardsSerializedParameter): void;
}
