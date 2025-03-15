import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { IBaseProgramParameters } from './base-program-parameters';

export interface IShareServerParameters extends IBaseProgramParameters {
  settingsState: ISettingsState;
}
