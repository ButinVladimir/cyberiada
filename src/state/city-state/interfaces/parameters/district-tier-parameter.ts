import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IDistrictTierSerializedParameter } from '../serialized-states/district-tier-serialized-parameter';

export interface IDistrictTierParameter extends IUIEventEmitter {
  tier: number;
  points: number;
  increasePoints(delta: number): void;
  recalculate(): void;
  setTier(tier: number): void;
  serialize(): IDistrictTierSerializedParameter;
  deserialize(serializedParameter: IDistrictTierSerializedParameter): void;
}
