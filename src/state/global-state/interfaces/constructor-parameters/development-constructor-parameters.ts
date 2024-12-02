import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { IGlobalState } from '../global-state';

export interface IDevelopmentConstructorParameters {
  stateUiConnector: IStateUIConnector;
  scenarioState: IScenarioState;
  messageLogState: IMessageLogState;
  globalState: IGlobalState;
}
