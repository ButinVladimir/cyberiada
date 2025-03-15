import { IAutomationState } from '@state/automation-state/interfaces/automation-state';
import { IBaseProgramParameters } from './base-program-parameters';
import { IProgramFactory } from '../program-factory';

export interface IMainframeProgramsAutobuyerParameters extends IBaseProgramParameters {
  programFactory: IProgramFactory;
  automationState: IAutomationState;
}
