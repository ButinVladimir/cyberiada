import { ProgramName } from '../types';
import { IProgram } from '../interfaces/program';
import { IMakeProgramParameters } from '../interfaces/make-program-parameters';
import { IBaseProgramParameters } from '../interfaces/program-parameters/base-program-parameters';

export abstract class BaseProgram implements IProgram {
  private _level!: number;
  private _quality!: number;

  abstract get name(): ProgramName;

  constructor(parameters: IBaseProgramParameters) {
    this._level = parameters.level;
    this._quality = parameters.quality;
  }

  get level() {
    return this._level;
  }

  get quality() {
    return this._quality;
  }

  abstract get isRepeatable(): boolean;

  abstract perform(cores: number, ram: number): void;

  serialize(): IMakeProgramParameters {
    return {
      name: this.name,
      level: this.level,
      quality: this.quality,
    };
  }
}
