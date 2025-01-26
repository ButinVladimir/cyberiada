import programs from '@configs/programs.json';
import { ProgramName } from '../types';
import { BaseProgram } from './base-program';

export class CodeGeneratorProgram extends BaseProgram {
  public readonly name = ProgramName.codeGenerator;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = false;

  perform(threads: number): void {
    this.globalState.computationalBase.increaseByProgram(this.calculateDelta(threads));
  }

  calculateDelta(threads: number): number {
    const programData = programs[this.name];

    return (
      this.scenarioState.currentValues.pointsByProgramMultipliers.program *
      threads *
      programData.computationalBaseLevelMultiplier *
      this.level *
      Math.pow(programData.computationalBaseQualityMultiplier, this.quality)
    );
  }
}
