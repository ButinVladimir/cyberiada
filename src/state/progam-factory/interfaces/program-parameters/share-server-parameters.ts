import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { IBaseProgramParameters } from './base-program-parameters';

export interface IShareServerParameters extends IBaseProgramParameters {
  scenarioState: IScenarioState;
  settingsState: ISettingsState;
  mainframeHardwareState: IMainframeHardwareState;
}
