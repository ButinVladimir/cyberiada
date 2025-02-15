import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { GameStateEvent, NotificationType } from '@shared/types';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';
import { IStoryEvent } from '@state/global-state/interfaces/story-event';
import { TYPES } from '@state/types';
import type { IGlobalState } from '../interfaces/global-state';
import { IStoryEventsState } from '../interfaces/parameters/story-events-state';

const { lazyInject } = decorators;

@injectable()
export class StoryEventsState implements IStoryEventsState {
  @lazyInject(TYPES.MessageLogState)
  private _messageLogState!: IMessageLogState;

  @lazyInject(TYPES.NotificationsState)
  private _notificationsState!: INotificationsState;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  visitEvents(prevLevel: number) {
    const storyEvents = this._globalState.scenario.currentValues.storyEvents;

    for (const storyEvent of storyEvents) {
      if (storyEvent.level <= prevLevel) {
        continue;
      }

      if (storyEvent.level > this._globalState.development.level) {
        continue;
      }

      if (storyEvent.messages) {
        storyEvent.messages.forEach((messageKey) => {
          this._notificationsState.pushNotification(NotificationType.storyEvent, { messageKey });
          this._messageLogState.postMessage(GameStateEvent.storyEvent, { messageKey }, false);
        });
      }

      if (storyEvent.unlockFeatures) {
        storyEvent.unlockFeatures.forEach((feature) => {
          this._globalState.unlockedFeatures.unlockFeature(feature);
        });
      }
    }
  }

  listAvailableGoals(): IStoryEvent[] {
    const availableGoals: IStoryEvent[] = [];
    const storyEvents = this._globalState.scenario.currentValues.storyEvents;

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

  startNewState(): void {
    this.visitEvents(0);
  }
}
