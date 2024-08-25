import { IGeneralState } from '@state/general-state/interfaces/general-state';
import { IMainframeHardwareState } from '@state/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { IBaseProgramParameters } from './base-program-parameters';

export interface IShareServerParameters extends IBaseProgramParameters {
  generalState: IGeneralState;
  settingsState: ISettingsState;
  mainframeHardwareState: IMainframeHardwareState;
}
