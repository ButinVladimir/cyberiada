import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { NotificationType } from '@shared/types';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';
import { TYPES } from '@state/types';
import { STORY_MESSAGES } from '@texts/story';
import type { IGlobalState } from '../interfaces/global-state';
import { IStoryEventsState } from '../interfaces/parameters/story-events-state';
import { IStoryGoal } from '../interfaces/story-goal';
import { StoryGoalState } from '../types';

const { lazyInject } = decorators;

@injectable()
export class StoryEventsState implements IStoryEventsState {
  private UI_EVENTS = {
    STORY_EVENT_REACHED: Symbol('STORY_EVENT_REACHED'),
  };

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.NotificationsState)
  private _notificationsState!: INotificationsState;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  constructor() {
    this._stateUiConnector.registerEvents(this.UI_EVENTS);
  }

  visitEventsByLevel(prevLevel: number) {
    this.visitEvents(prevLevel);
  }

  listGoals(): IStoryGoal[] {
    this._stateUiConnector.connectEvent(this.UI_EVENTS.STORY_EVENT_REACHED);

    const availableGoals: IStoryGoal[] = [];
    const storyEvents = this._globalState.scenario.currentValues.storyEvents;
    let state: StoryGoalState = StoryGoalState.passed;

    for (const storyEvent of storyEvents) {
      state = StoryGoalState.passed;

      if (storyEvent.level > this._globalState.development.level) {
        state = StoryGoalState.available;
      }

      availableGoals.push({
        ...storyEvent,
        state,
      });
    }

    return availableGoals;
  }

  startNewState(): void {
    this.visitEvents(-1);
  }

  private visitEvents(prevLevel: number) {
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
          this._notificationsState.pushNotification(NotificationType.storyEvent, STORY_MESSAGES[messageKey]());
        });
      }

      if (storyEvent.unlockFeatures) {
        storyEvent.unlockFeatures.forEach((feature) => {
          this._globalState.unlockedFeatures.unlockFeature(feature);
        });
      }
    }

    this._stateUiConnector.enqueueEvent(this.UI_EVENTS.STORY_EVENT_REACHED);
  }
}
