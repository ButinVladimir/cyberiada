import programs from '@configs/programs.json';
import { MS_IN_SECOND } from '@shared/constants';
import { ProgramName } from '../types';
import { BaseProgram } from './base-program';

export class CodeGeneratorProgram extends BaseProgram {
  public readonly name = ProgramName.codeGenerator;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = false;

  perform(threads: number): void {
    this.globalState.computationalBase.increaseByProgram(this.calculateDelta(threads));
  }

  buildProgramDescriptionParametersObject(threads: number) {
    const delta = this.calculateDelta(threads);

    const minAvgValue = delta / this.calculateCompletionMaxTime(threads);
    const maxAvgValue = delta / this.calculateCompletionMinTime(threads);

    return {
      value: this.formatter.formatNumberLong(delta),
      minAvgValue: this.formatter.formatNumberLong(minAvgValue * MS_IN_SECOND),
      maxAvgValue: this.formatter.formatNumberLong(maxAvgValue * MS_IN_SECOND),
    };
  }

  buildProcessDescriptionParametersObject(threads: number, usedCores: number) {
    const delta = this.calculateDelta(threads);
    const completionTime = this.calculateCompletionTime(threads, usedCores);

    const avgValue = delta / completionTime;

    return {
      value: this.formatter.formatNumberLong(delta),
      avgValue: this.formatter.formatNumberLong(avgValue * MS_IN_SECOND),
    };
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
