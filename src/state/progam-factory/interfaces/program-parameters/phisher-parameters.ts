import { IGeneralState } from '@state/general-state/interfaces/general-state';
import { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { IBaseProgramParameters } from './base-program-parameters';

export interface IPhisherParameters extends IBaseProgramParameters {
  generalState: IGeneralState;
  mainframeState: IMainframeState;
}
