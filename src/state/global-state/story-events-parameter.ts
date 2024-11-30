import { GameStateEvent, NotificationType } from '@shared/types';
import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IStoryEvent } from '@state/scenario-state/interfaces/story-event';
import { IGlobalState } from './interfaces/global-state';
import { IStoryEventsParameter } from './interfaces/story-events-parameter';
import { IStoryEventsSerializedParameter } from './interfaces/serialized-states/story-events-serialized-parameter';
import { IStoryEventsConstructorParameters } from './interfaces/constructor-parameters/story-events-constructor-parameters';

export class StoryEventsParameter implements IStoryEventsParameter {
  private _messageLogState: IMessageLogState;
  private _notificationsState: INotificationsState;
  private _scenarioState: IScenarioState;
  private _globalState: IGlobalState;

  private _lastUpdateDevelopmentLevel: number;

  constructor(parameters: IStoryEventsConstructorParameters) {
    this._messageLogState = parameters.messageLogState;
    this._notificationsState = parameters.notificationsState;
    this._scenarioState = parameters.scenarioState;
    this._globalState = parameters.globalState;

    this._lastUpdateDevelopmentLevel = 0;
  }

  visitEvents() {
    const storyEvents = this._scenarioState.currentValues.storyEvents;

    for (const storyEvent of storyEvents) {
      if (storyEvent.level <= this._lastUpdateDevelopmentLevel) {
        continue;
      }

      if (storyEvent.level > this._globalState.development.level) {
        continue;
      }

      if (storyEvent.messages) {
        storyEvent.messages.forEach((messageKey) => {
          this._notificationsState.pushNotification(NotificationType.storyEvent, { messageKey });
          this._messageLogState.postMessage(GameStateEvent.storyEvent, { messageKey });
        });
      }

      if (storyEvent.unlockFeatures) {
        storyEvent.unlockFeatures.forEach((feature) => {
          this._globalState.unlockedFeatures.unlockFeature(feature);
        });
      }
    }

    this._lastUpdateDevelopmentLevel = Math.max(this._lastUpdateDevelopmentLevel, this._globalState.development.level);
  }

  listAvailableGoals(): IStoryEvent[] {
    const availableGoals: IStoryEvent[] = [];
    const storyEvents = this._scenarioState.currentValues.storyEvents;

    for (const storyEvent of storyEvents) {
      if (storyEvent.level <= this._globalState.development.level) {
        continue;
      }

      if (
        storyEvent.unlockFeatures?.every((feature) => this._globalState.unlockedFeatures.isFeatureUnlocked(feature))
      ) {
        continue;
      }

      availableGoals.push(storyEvent);
    }

    return availableGoals;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._lastUpdateDevelopmentLevel = 0;

    this.visitEvents();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IStoryEventsSerializedParameter): Promise<void> {
    this._lastUpdateDevelopmentLevel = serializedState.lastUpdateDevelopmentLevel;
  }

  serialize(): IStoryEventsSerializedParameter {
    return {
      lastUpdateDevelopmentLevel: this._lastUpdateDevelopmentLevel,
    };
  }
}
