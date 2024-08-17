import programs from '@configs/programs.json';
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

  abstract get isPassive(): boolean;

  abstract perform(cores: number, ram: number): void;

  updateProgram(newProgram: IProgram): void {
    if (this.name !== newProgram.name) {
      throw new Error(`Unable to update program ${this.name} with ${newProgram.name}`);
    }

    this._level = newProgram.level;
    this._quality = newProgram.quality;
  }

  getCost(): number {
    const programData = programs[this.name];

    return (
      programData.baseCost *
      Math.pow(programData.levelCostMultiplier, this.level - 1) *
      Math.pow(programData.qualityCostMultiplier, this.quality)
    );
  }

  getRam(): number {
    return programs[this.name].ram;
  }

  getCores() {
    return programs[this.name].cores * this.quality;
  }

  serialize(): IMakeProgramParameters {
    return {
      name: this.name,
      level: this.level,
      quality: this.quality,
    };
  }
}
