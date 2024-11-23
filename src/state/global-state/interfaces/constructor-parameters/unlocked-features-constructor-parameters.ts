import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';

export interface IUnlockedFeaturesConstructorParameters {
  stateUiConnector: IStateUIConnector;
  messageLogState: IMessageLogState;
}
