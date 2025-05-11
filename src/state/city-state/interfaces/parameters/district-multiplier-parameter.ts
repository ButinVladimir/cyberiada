import { IDistrictMultiplierSerializedParameter } from '../serialized-states/district-multiplier-serialized-parameter';

export interface IDistrictMultiplierParameter {
  points: number;
  multiplier: number;
  increasePoints(delta: number): void;
  recalculate(): void;
  serialize(): IDistrictMultiplierSerializedParameter;
  deserialize(serializedParameter: IDistrictMultiplierSerializedParameter): void;
}
