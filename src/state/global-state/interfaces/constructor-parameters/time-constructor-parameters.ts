import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';

export interface ITimeConstructorParameters {
  stateUiConnector: IStateUIConnector;
  settingsState: ISettingsState;
  scenarioState: IScenarioState;
}
