import { ISerializeable } from '@shared/interfaces/serializable';
import { Feature } from '@shared/types';
import { IUnlockedFeaturesSerializedState } from '../serialized-states/unlocked-features-serialized-state';

export interface IUnlockedFeaturesState extends ISerializeable<IUnlockedFeaturesSerializedState> {
  isFeatureUnlocked(feature: Feature): boolean;
  unlockFeature(feature: Feature): void;
  listUnlockedFeatures(): Feature[];
}
