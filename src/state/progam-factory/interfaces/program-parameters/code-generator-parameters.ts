import { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IMainframeDevelopingProgramsState } from '@state/mainframe/mainframe-developing-programs-state/interfaces/mainframe-developing-programs-state';
import { IBaseProgramParameters } from './base-program-parameters';

export interface ICodeGeneratorParameters extends IBaseProgramParameters {
  mainframeHardwareState: IMainframeHardwareState;
  mainframeDevelopingProgramsState: IMainframeDevelopingProgramsState;
}
