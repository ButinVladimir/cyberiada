import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';

export interface IMoneyConstructorParameters {
  stateUiConnector: IStateUIConnector;
  scenarioState: IScenarioState;
}
