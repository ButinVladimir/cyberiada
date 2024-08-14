import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import type { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { IProgramFactory } from './interfaces/program-factory';
import { IMakeProgramParameters, IProgram } from './interfaces';
import { ProgramName } from './types';
import { PhisherProgram } from './programs';

const { lazyInject } = decorators;

@injectable()
export class ProgramFactory implements IProgramFactory {
  @lazyInject(TYPES.GeneralState)
  private _generalState!: IGeneralState;

  @lazyInject(TYPES.MainframeState)
  private _mainframeState!: IMainframeState;

  makeProgram(parameters: IMakeProgramParameters): IProgram {
    switch (parameters.name) {
      case ProgramName.phisher:
        return new PhisherProgram({
          generalState: this._generalState,
          mainframeState: this._mainframeState,
          level: parameters.level,
          quality: parameters.quality,
        });
    }
  }
}
