import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import type { IMainframeHardwareState } from '@state/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IProgramFactory } from './interfaces/program-factory';
import { IMakeProgramParameters, IProgram } from './interfaces';
import { ProgramName } from './types';
import { CloudAIShareProgram } from './programs';

const { lazyInject } = decorators;

@injectable()
export class ProgramFactory implements IProgramFactory {
  @lazyInject(TYPES.GeneralState)
  private _generalState!: IGeneralState;

  @lazyInject(TYPES.MainframeHardwareState)
  private _mainframeHardwareState!: IMainframeHardwareState;

  makeProgram(parameters: IMakeProgramParameters): IProgram {
    switch (parameters.name) {
      case ProgramName.cloudAiShare:
        return new CloudAIShareProgram({
          generalState: this._generalState,
          mainframeHardwareState: this._mainframeHardwareState,
          level: parameters.level,
          quality: parameters.quality,
        });
    }
  }
}
