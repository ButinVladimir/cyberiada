import { IMainframeHardwareState } from '@state/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IMainframeDevelopingProgramsState } from '@state/mainframe-developing-programs-state/interfaces/mainframe-developing-programs-state';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { IBaseProgramParameters } from './base-program-parameters';

export interface ICodeGeneratorParameters extends IBaseProgramParameters {
  settingsState: ISettingsState;
  mainframeHardwareState: IMainframeHardwareState;
  mainframeDevelopingProgramsState: IMainframeDevelopingProgramsState;
}
