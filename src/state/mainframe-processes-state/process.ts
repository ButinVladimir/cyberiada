import { IProgram } from '@state/progam-factory/interfaces/program';
import constants from '@configs/programs.json';
import { IMainframeHardwareState } from '@state/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IProcess, IProcessParameters, ISerializedProcess } from './interfaces';

export class Process implements IProcess {
  private _id: string;
  private _program: IProgram;
  private _isActive: boolean;
  private _currentCompletionPoints: number;
  private _mainframeHardwareState: IMainframeHardwareState;

  constructor(parameters: IProcessParameters) {
    this._id = parameters.id;
    this._program = parameters.program;
    this._isActive = parameters.isActive;
    this._currentCompletionPoints = parameters.currentCompletionPoints;
    this._mainframeHardwareState = parameters.mainframeHardwareState;
  }

  get id() {
    return this._id;
  }

  get program() {
    return this._program;
  }

  get isActive() {
    return this._isActive;
  }

  get currentCompletionPoints() {
    return this._currentCompletionPoints;
  }

  get maxCompletionPoints() {
    return constants[this.program.name].processCompletionPoints;
  }

  toggleActive(active: boolean) {
    this._isActive = active;
  }

  increaseCompletion(cores: number): void {
    const programConstants = constants[this.program.name];
    this._currentCompletionPoints +=
      cores *
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
      id: this.id,
      programName: this.program.name,
      isActive: this.isActive,
    };
  }
}
