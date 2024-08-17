import { IMainframeHardwareState } from '@state/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IProgram } from '@state/progam-factory/interfaces/program';

export interface IProcessParameters {
  id: string;
  program: IProgram;
  isActive: boolean;
  currentCompletionPoints: number;
  mainframeHardwareState: IMainframeHardwareState;
}
