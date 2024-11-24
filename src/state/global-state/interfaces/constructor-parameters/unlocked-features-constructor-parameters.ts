import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';

export interface IUnlockedFeaturesConstructorParameters {
  stateUiConnector: IStateUIConnector;
  messageLogState: IMessageLogState;
  notificationsState: INotificationsState;
}
