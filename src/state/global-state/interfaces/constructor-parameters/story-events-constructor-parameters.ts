import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IGlobalState } from '../global-state';

export interface IStoryEventsConstructorParameters {
  messageLogState: IMessageLogState;
  notificationsState: INotificationsState;
  scenarioState: IScenarioState;
  globalState: IGlobalState;
}
