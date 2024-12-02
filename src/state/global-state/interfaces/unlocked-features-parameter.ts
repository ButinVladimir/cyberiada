import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializeable } from '@shared/interfaces/serializable';
import { Feature } from '@shared/types';
import { IUnlockedFeaturesSerializedParameter } from './serialized-states/unlocked-features-serialized-parameter';

export interface IUnlockedFeaturesParameter
  extends ISerializeable<IUnlockedFeaturesSerializedParameter>,
    IUIEventEmitter {
  isFeatureUnlocked(feature: Feature): boolean;
  unlockFeature(feature: Feature): void;
  listUnlockedFeatures(): Feature[];
}
