import { ISnapshotable } from '@shared/index';
import { IDistrictMultiplierSerializedParameter } from '../serialized-states';
import { IDistrictMultiplierParameterSnapshot } from '../snapshot-states';

export interface IDistrictMultiplierParameter extends ISnapshotable<IDistrictMultiplierParameterSnapshot> {
  points: number;
  multiplier: number;
  increasePoints(delta: number): void;
  recalculate(): void;
  serialize(): IDistrictMultiplierSerializedParameter;
  deserialize(serializedParameter: IDistrictMultiplierSerializedParameter): void;
}
