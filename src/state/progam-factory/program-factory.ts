import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import type { IMainframeHardwareState } from '@state/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import type { IMainframeDevelopingProgramsState } from '@state/mainframe-developing-programs-state/interfaces/mainframe-developing-programs-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { IProgramFactory } from './interfaces/program-factory';
import { IMakeProgramParameters, IProgram } from './interfaces';
import { ProgramName } from './types';
import { ShareServerProgram, CodeGeneratorProgram } from './programs';

const { lazyInject } = decorators;

@injectable()
export class ProgramFactory implements IProgramFactory {
  @lazyInject(TYPES.GeneralState)
  private _generalState!: IGeneralState;

  @lazyInject(TYPES.SettingsState)
  private _settingsState!: ISettingsState;

  @lazyInject(TYPES.MainframeHardwareState)
  private _mainframeHardwareState!: IMainframeHardwareState;

  @lazyInject(TYPES.MainframeDevelopingProgramsState)
  private _mainframeDevelopingProgramsState!: IMainframeDevelopingProgramsState;

  @lazyInject(TYPES.Formatter)
  private _formatter!: IFormatter;

  private _programRepository: Set<IProgram>;

  constructor() {
    this._programRepository = new Set<IProgram>();
  }

  makeProgram(parameters: IMakeProgramParameters): IProgram {
    const program: IProgram = this.makeProgramImplementation(parameters);

    this._programRepository.add(program);

    return program;
  }

  deleteProgram(program: IProgram) {
    program.removeEventListeners();

    this._programRepository.delete(program);
  }

  deleteAllPrograms() {
    for (const program of this._programRepository.values()) {
      program.removeEventListeners();
    }

    this._programRepository.clear();
  }

  fireUiEvents() {
    for (const program of this._programRepository.values()) {
      program.fireUiEvents();
    }
  }

  private makeProgramImplementation(parameters: IMakeProgramParameters): IProgram {
    switch (parameters.name) {
      case ProgramName.shareServer:
        return new ShareServerProgram({
          generalState: this._generalState,
          settingsState: this._settingsState,
          mainframeHardwareState: this._mainframeHardwareState,
          formatter: this._formatter,
          level: parameters.level,
          quality: parameters.quality,
        });

      case ProgramName.codeGenerator:
        return new CodeGeneratorProgram({
          settingsState: this._settingsState,
          mainframeHardwareState: this._mainframeHardwareState,
          mainframeDevelopingProgramsState: this._mainframeDevelopingProgramsState,
          formatter: this._formatter,
          level: parameters.level,
          quality: parameters.quality,
        });
    }    
  }
}
