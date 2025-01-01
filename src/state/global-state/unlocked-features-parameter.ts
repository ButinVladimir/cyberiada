import { Feature, GameStateEvent, NotificationType } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';
import { IUnlockedFeaturesParameter } from './interfaces/unlocked-features-parameter';
import { IUnlockedFeaturesSerializedParameter } from './interfaces/serialized-states/unlocked-features-serialized-parameter';
import { IUnlockedFeaturesConstructorParameters } from './interfaces/constructor-parameters/unlocked-features-constructor-parameters';
import { GLOBAL_STATE_UI_EVENTS } from './constants';

export class UnlockedFeaturesParameter implements IUnlockedFeaturesParameter {
  readonly uiEventBatcher: EventBatcher;

  private _stateUiConnector: IStateUIConnector;
  private _messageLogState: IMessageLogState;
  private _notificationsState: INotificationsState;

  private _unlockedFeatures: Set<Feature>;

  constructor(parameters: IUnlockedFeaturesConstructorParameters) {
    this._stateUiConnector = parameters.stateUiConnector;
    this._messageLogState = parameters.messageLogState;
    this._notificationsState = parameters.notificationsState;

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

      this._notificationsState.pushNotification(NotificationType.featureUnlocked, { feature });
      this._messageLogState.postMessage(GameStateEvent.featureUnlocked, { feature }, false);
    }
  }

  listUnlockedFeatures(): Feature[] {
    return Array.from(this._unlockedFeatures.values());
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._unlockedFeatures.clear();

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.FEATURE_UNLOCKED);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IUnlockedFeaturesSerializedParameter): Promise<void> {
    this._unlockedFeatures.clear();

    serializedState.unlockedFeatures.forEach((feature: Feature) => this._unlockedFeatures.add(feature));

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.FEATURE_UNLOCKED);
  }

  serialize(): IUnlockedFeaturesSerializedParameter {
    return {
      unlockedFeatures: Array.from(this._unlockedFeatures.values()),
    };
  }
}
