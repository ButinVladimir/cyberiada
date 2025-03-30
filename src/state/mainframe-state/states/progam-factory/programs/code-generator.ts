import programs from '@configs/programs.json';
import { MultiplierProgramName } from '../types';
import { BaseProgram } from './base-program';

export class CodeGeneratorProgram extends BaseProgram {
  public readonly name = MultiplierProgramName.codeGenerator;
  public readonly isAutoscalable = false;

  handlePerformanceUpdate(): void {
    this.growthState.multipliers.codeBase.requestGrowthRecalculation();
  }

  perform(threads: number): void {
    this.globalState.multipliers.codeBase.increasePointsByProgram(this.calculateDelta(threads));
  }

  calculateDelta(threads: number): number {
    const programData = programs[this.name];

    return (
      this.globalState.scenario.currentValues.programMultipliers.codeBase.pointsPerCompletion *
      this.globalState.multipliers.rewards.multiplierByProgram *
      threads *
      programData.codeBaseLevelMultiplier *
      this.level *
      Math.pow(programData.codeBaseQualityMultiplier, this.quality)
    );
  }
}
