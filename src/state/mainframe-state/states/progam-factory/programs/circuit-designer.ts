import programs from '@configs/programs.json';
import { MultiplierProgramName } from '../types';
import { BaseProgram } from './base-program';
import { calculateQualityPower } from '@/shared';

export class CircuitDesignerProgram extends BaseProgram {
  public readonly name = MultiplierProgramName.circuitDesigner;
  public readonly isAutoscalable = false;

  handlePerformanceUpdate(): void {
    this.growthState.multipliers.computationalBase.requestGrowthRecalculation();
  }

  perform(threads: number): void {
    this.globalState.multipliers.computationalBase.increasePointsByProgram(this.calculateDelta(threads));
  }

  calculateDelta(threads: number): number {
    const programData = programs[this.name];

    return (
      this.globalState.scenario.currentValues.programMultipliers.computationalBase.pointsMultiplier *
      this.globalState.multipliers.rewards.totalMultiplier *
      threads *
      calculateQualityPower(this.level - 1, this.quality, programData.computationalBase)
    );
  }
}
