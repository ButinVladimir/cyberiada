import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { IGrowthState } from '@state/growth-state/interfaces/growth-state';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import type { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { IProgramFactory } from './interfaces/program-factory';
import { IMakeProgramParameters, IProgram } from './interfaces';
import { ProgramName } from './types';
import { ShareServerProgram, CodeGeneratorProgram } from './programs';
import { PredictiveComputatorProgram } from './programs/predictive-computator';

const { lazyInject } = decorators;

@injectable()
export class ProgramFactory implements IProgramFactory {
  @lazyInject(TYPES.ScenarioState)
  private _scenarioState!: IScenarioState;

  @lazyInject(TYPES.GrowthState)
  private _growthState!: IGrowthState;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  @lazyInject(TYPES.SettingsState)
  private _settingsState!: ISettingsState;

  @lazyInject(TYPES.MainframeProcessesState)
  private _mainframeProcessesState!: IMainframeProcessesState;

  @lazyInject(TYPES.MainframeHardwareState)
  private _mainframeHardwareState!: IMainframeHardwareState;

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
          formatter: this._formatter,
          level: parameters.level,
          quality: parameters.quality,
          growthState: this._growthState,
          globalState: this._globalState,
          mainframeProcessesState: this._mainframeProcessesState,
          mainframeHardwareState: this._mainframeHardwareState,
          scenarioState: this._scenarioState,
          settingsState: this._settingsState,
        });

      case ProgramName.codeGenerator:
        return new CodeGeneratorProgram({
          formatter: this._formatter,
          level: parameters.level,
          quality: parameters.quality,
          growthState: this._growthState,
          globalState: this._globalState,
          mainframeProcessesState: this._mainframeProcessesState,
          mainframeHardwareState: this._mainframeHardwareState,
          scenarioState: this._scenarioState,
        });

      case ProgramName.predictiveComputator:
        return new PredictiveComputatorProgram({
          formatter: this._formatter,
          level: parameters.level,
          quality: parameters.quality,
          growthState: this._growthState,
          globalState: this._globalState,
          scenarioState: this._scenarioState,
          mainframeProcessesState: this._mainframeProcessesState,
          mainframeHardwareState: this._mainframeHardwareState,
        });
    }
  }
}
