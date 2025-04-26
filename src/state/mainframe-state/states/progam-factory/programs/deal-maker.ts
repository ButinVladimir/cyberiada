import programs from '@configs/programs.json';
import { calculateQualityPower } from '@shared/helpers';
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
      this.globalState.scenario.currentValues.programMultipliers.rewards.pointsMultiplier *
      this.globalState.multipliers.rewards.totalMultiplier *
      threads *
      calculateQualityPower(this.level - 1, this.quality, programData.rewards)
    );
  }
}
