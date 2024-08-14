import { IGeneralState } from '@state/general-state/interfaces/general-state';
import { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { ProgramName } from '../types';
import { IPhisherParameters } from '../interfaces/program-parameters/phisher-parameters';
import { BaseProgram } from './base-program';

export class PhisherProgram extends BaseProgram {
  public readonly name = ProgramName.phisher;
  private _generalState: IGeneralState;
  private _mainframeState: IMainframeState;

  constructor(parameters: IPhisherParameters) {
    super(parameters);

    this._generalState = parameters.generalState;
    this._mainframeState = parameters.mainframeState;
  }

  perform(cores: number): boolean {
    return false;
  }
}
