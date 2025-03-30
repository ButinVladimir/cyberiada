import programs from '@configs/programs.json';
import { MultiplierProgramName } from '../types';
import { BaseProgram } from './base-program';

export class DealMakerProgram extends BaseProgram {
  public readonly name = MultiplierProgramName.dealMaker;
  public readonly isAutoscalable = false;

  handlePerformanceUpdate(): void {
    this.growthState.multipliers.rewards.requestGrowthRecalculation();
  }

  perform(threads: number): void {
    this.globalState.multipliers.rewards.increasePointsByProgram(this.calculateDelta(threads));
  }

  calculateDelta(threads: number): number {
    const programData = programs[this.name];

    return (
      this.globalState.scenario.currentValues.programMultipliers.rewards.pointsPerCompletion *
      this.globalState.multipliers.rewards.multiplierByProgram *
      threads *
      programData.rewardsLevelMultiplier *
      this.level *
      Math.pow(programData.rewardsQualityMultiplier, this.quality)
    );
  }
}
