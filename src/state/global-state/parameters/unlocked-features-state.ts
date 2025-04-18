import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { Feature, NotificationType } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';
import { TYPES } from '@state/types';
import { UNLOCKED_FEATURE_TEXTS } from '@texts/unlocked-features';
import { IUnlockedFeaturesState } from '../interfaces/parameters/unlocked-features-state';
import { IUnlockedFeaturesSerializedState } from '../interfaces/serialized-states/unlocked-features-serialized-state';
import { GLOBAL_STATE_UI_EVENTS } from '../constants';

const { lazyInject } = decorators;

@injectable()
export class UnlockedFeaturesState implements IUnlockedFeaturesState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.NotificationsState)
  private _notificationsState!: INotificationsState;

  private _unlockedFeatures: Set<Feature>;

  constructor() {
    this._unlockedFeatures = new Set<Feature>();

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  isFeatureUnlocked(feature: Feature): boolean {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.FEATURE_UNLOCKED);

    return this._unlockedFeatures.has(feature);
  }

  unlockFeature(feature: Feature) {
    if (!this._unlockedFeatures.has(feature)) {
      this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.FEATURE_UNLOCKED);

      this._unlockedFeatures.add(feature);

      this._notificationsState.pushNotification(
        NotificationType.featureUnlocked,
        UNLOCKED_FEATURE_TEXTS[feature].message(),
      );
    }
  }

  listUnlockedFeatures(): Feature[] {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.FEATURE_UNLOCKED);

    return Array.from(this._unlockedFeatures.values());
  }

  async startNewState(): Promise<void> {
    this._unlockedFeatures.clear();

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.FEATURE_UNLOCKED);
  }

  async deserialize(serializedState: IUnlockedFeaturesSerializedState): Promise<void> {
    this._unlockedFeatures.clear();

    serializedState.unlockedFeatures.forEach((feature: Feature) => this._unlockedFeatures.add(feature));

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.FEATURE_UNLOCKED);
  }

  serialize(): IUnlockedFeaturesSerializedState {
    return {
      unlockedFeatures: Array.from(this._unlockedFeatures.values()),
    };
  }
}
