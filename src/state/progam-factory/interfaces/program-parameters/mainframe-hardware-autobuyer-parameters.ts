import { IAutomationState } from '@state/automation-state/interfaces/automation-state';
import { IBaseProgramParameters } from './base-program-parameters';

export interface IMainframeHardwareAutobuyerParameters extends IBaseProgramParameters {
  automationState: IAutomationState;
}
