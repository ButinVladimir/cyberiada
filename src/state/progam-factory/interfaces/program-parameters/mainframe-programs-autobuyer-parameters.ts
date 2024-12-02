import { IMainframeProgramsAutomationState } from '@state/automation/mainframe-programs-automation-state/interfaces/mainframe-programs-automation-state';
import { IBaseProgramParameters } from './base-program-parameters';
import { IProgramFactory } from '../program-factory';

export interface IMainframeProgramsAutobuyerParameters extends IBaseProgramParameters {
  programFactory: IProgramFactory;
  mainframeProgramsAutomationState: IMainframeProgramsAutomationState;
}
