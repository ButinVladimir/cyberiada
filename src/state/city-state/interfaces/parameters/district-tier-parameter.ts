import { IDistrictTierSerializedParameter } from '../serialized-states/district-tier-serialized-parameter';

export interface IDistrictTierParameter {
  tier: number;
  points: number;
  increasePoints(delta: number): void;
  getTierRequirements(tier: number): number;
  recalculate(): void;
  setTier(tier: number): void;
  serialize(): IDistrictTierSerializedParameter;
  deserialize(serializedParameter: IDistrictTierSerializedParameter): void;
  removeAllEventListeners(): void;
}
