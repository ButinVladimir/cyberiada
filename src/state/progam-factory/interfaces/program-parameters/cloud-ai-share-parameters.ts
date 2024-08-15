import { IGeneralState } from '@state/general-state/interfaces/general-state';
import { IMainframeHardwareState } from '@state/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IBaseProgramParameters } from './base-program-parameters';

export interface ICloudAiShareParameters extends IBaseProgramParameters {
  generalState: IGeneralState;
  mainframeHardwareState: IMainframeHardwareState;
}
