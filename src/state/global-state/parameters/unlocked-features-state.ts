import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { Feature, NotificationType } from '@shared/types';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';
import { TYPES } from '@state/types';
import { UNLOCKED_FEATURE_TEXTS } from '@texts/unlocked-features';
import { type IGlobalState, IUnlockedFeaturesSerializedState, IUnlockedFeaturesState } from '../interfaces';

const { lazyInject } = decorators;

@injectable()
export class UnlockedFeaturesState implements IUnlockedFeaturesState {
  private UI_EVENTS = {
    FEATURE_UNLOCKED: Symbol('FEATURE_UNLOCKED'),
  };

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.NotificationsState)
  private _notificationsState!: INotificationsState;

  private _unlockedFeatures: Set<Feature>;

  constructor() {
    this._unlockedFeatures = new Set<Feature>();

    this._stateUiConnector.registerEvents(this.UI_EVENTS);
  }

  isFeatureUnlocked(feature: Feature): boolean {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.FEATURE_UNLOCKED);

    return this._unlockedFeatures.has(feature);
  }

  unlockFeature(feature: Feature) {
    if (!this._unlockedFeatures.has(feature)) {
      this._unlockedFeatures.add(feature);

      this._globalState.availableItems.requestRecalculation();
      this._globalState.availableActivities.requestRecalculation();

      this._notificationsState.pushNotification(
        NotificationType.featureUnlocked,
        UNLOCKED_FEATURE_TEXTS[feature].message(),
      );

      this._stateUiConnector.enqueueEvent(this.UI_EVENTS.FEATURE_UNLOCKED);
    }
  }

  listUnlockedFeatures(): Feature[] {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.FEATURE_UNLOCKED);

    return Array.from(this._unlockedFeatures.values());
  }

  async startNewState(): Promise<void> {
    this._unlockedFeatures.clear();

    this._stateUiConnector.enqueueEvent(this.UI_EVENTS.FEATURE_UNLOCKED);
  }

  async deserialize(serializedState: IUnlockedFeaturesSerializedState): Promise<void> {
    this._unlockedFeatures.clear();

    serializedState.unlockedFeatures.forEach((feature: Feature) => this._unlockedFeatures.add(feature));

    this._stateUiConnector.enqueueEvent(this.UI_EVENTS.FEATURE_UNLOCKED);
  }

  serialize(): IUnlockedFeaturesSerializedState {
    return {
      unlockedFeatures: Array.from(this._unlockedFeatures.values()),
    };
  }
}
