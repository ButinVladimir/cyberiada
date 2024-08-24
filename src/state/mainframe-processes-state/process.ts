import { IProgram } from '@state/progam-factory/interfaces/program';
import constants from '@configs/programs.json';
import { IMainframeHardwareState } from '@state/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { IMainframeProcessesState, IProcess, IProcessParameters, ISerializedProcess } from './interfaces';

export class Process implements IProcess {
  private _program: IProgram;
  private _isActive: boolean;
  private _threads: number;
  private _currentCompletionPoints: number;
  private _settingsState: ISettingsState;
  private _mainframeHardwareState: IMainframeHardwareState;
  private _mainframeProcessesState: IMainframeProcessesState;

  constructor(parameters: IProcessParameters) {
    this._program = parameters.program;
    this._isActive = parameters.isActive;
    this._threads = parameters.threads;
    this._currentCompletionPoints = parameters.currentCompletionPoints;
    this._settingsState = parameters.settingsState;
    this._mainframeHardwareState = parameters.mainframeHardwareState;
    this._mainframeProcessesState = parameters.mainframeProcessesState;
  }

  get program() {
    return this._program;
  }

  get isActive() {
    return this._isActive;
  }

  get threads() {
    return this._threads;
  }

  get currentCompletionPoints() {
    return this._currentCompletionPoints;
  }

  get maxCompletionPoints() {
    return constants[this.program.name].processCompletionPoints;
  }

  toggleActive(active: boolean) {
    this._isActive = active;
    this._mainframeProcessesState.updateRunningProcesses();
    this._mainframeProcessesState.fireUiEvents();
  }

  getTotalRam() {
    return this.program.getRam() * this.threads;
  }

  increaseCompletion(usedCores: number): void {
    const programConstants = constants[this.program.name];
    this._currentCompletionPoints +=
      this._settingsState.updateInterval *
      usedCores *
      this.program.level *
      this._mainframeHardwareState.performance *
      Math.pow(programConstants.qualityCompletionPointsMultiplier, this.program.quality);

    const maxCompletionPoints = this.maxCompletionPoints;

    if (this._currentCompletionPoints > maxCompletionPoints) {
      this._currentCompletionPoints = maxCompletionPoints;
    }
  }

  resetCompletion(): void {
    this._currentCompletionPoints = 0;
  }

  serialize(): ISerializedProcess {
    return {
      programName: this.program.name,
      isActive: this.isActive,
      threads: this._threads,
      currentCompletionPoints: this.currentCompletionPoints,
    };
  }
}
