import { IMainframeHardwareAutomationState } from '@state/automation/mainframe-hardware-automation-state/interfaces/mainframe-hardware-automation-state';
import { IBaseProgramParameters } from './base-program-parameters';

export interface IMainframeHardwareAutobuyerParameters extends IBaseProgramParameters {
  mainframeHardwareAutomationState: IMainframeHardwareAutomationState;
}
