import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { IBaseProgramParameters } from './base-program-parameters';

export interface IShareServerParameters extends IBaseProgramParameters {
  scenarioState: IScenarioState;
  settingsState: ISettingsState;
}
