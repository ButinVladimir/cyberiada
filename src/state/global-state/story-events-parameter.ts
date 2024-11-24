import { Scenario, GameStateEvent, NotificationType } from '@shared/types';
import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IGlobalState } from './interfaces/global-state';
import { IStoryEventsParameter } from './interfaces/story-events-parameter';
import { IStoryEventsSerializedParameter } from './interfaces/serialized-states/story-events-serialized-parameter';
import { IStoryEventsConstructorParameters } from './interfaces/constructor-parameters/story-events-constructor-parameters';

export class StoryEventsParameter implements IStoryEventsParameter {
  private _messageLogState: IMessageLogState;
  private _notificationsState: INotificationsState;
  private _scenarioState: IScenarioState;
  private _globalState: IGlobalState;

  private _visitedEvents: Map<Scenario, Set<string>>;

  constructor(parameters: IStoryEventsConstructorParameters) {
    this._messageLogState = parameters.messageLogState;
    this._notificationsState = parameters.notificationsState;
    this._scenarioState = parameters.scenarioState;
    this._globalState = parameters.globalState;

    this._visitedEvents = new Map<Scenario, Set<string>>();
  }

  isEventVisited(event: string) {
    const events = this._visitedEvents.get(this._scenarioState.scenario);

    if (!events) {
      return false;
    }

    return events.has(event);
  }

  visitEvents() {
    let scenarioVisitedEvents = this._visitedEvents.get(this._scenarioState.scenario);
    if (!scenarioVisitedEvents) {
      scenarioVisitedEvents = new Set<string>();
      this._visitedEvents.set(this._scenarioState.scenario, scenarioVisitedEvents);
    }

    const storyEvents = this._scenarioState.currentValues.storyEvents;

    for (const storyEvent of storyEvents) {
      if (scenarioVisitedEvents.has(storyEvent.key)) {
        continue;
      }

      if (this._globalState.cityDevelopment.level < storyEvent.level) {
        continue;
      }

      scenarioVisitedEvents.add(storyEvent.key);

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
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._visitedEvents.clear();

    this.visitEvents();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IStoryEventsSerializedParameter): Promise<void> {
    this._visitedEvents.clear();

    Object.entries(serializedState.visitedEvents).forEach(([scenario, events]) => {
      this._visitedEvents.set(scenario as Scenario, new Set(events));
    });

    this.visitEvents();
  }

  serialize(): IStoryEventsSerializedParameter {
    const visitedEvents: { [P in Scenario]?: string[] } = {};

    this._visitedEvents.forEach((events, scenario) => (visitedEvents[scenario] = Array.from(events.values())));

    return {
      visitedEvents,
    };
  }
}
