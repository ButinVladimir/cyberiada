import programs from '@configs/programs.json';
import { calculateTierPower } from '@shared/helpers';
import { MultiplierProgramName } from '../types';
import { BaseProgram } from './base-program';

export class InformationCollectorProgram extends BaseProgram {
  public readonly name = MultiplierProgramName.informationCollector;
  public readonly isAutoscalable = false;

  handlePerformanceUpdate(): void {}

  perform(threads: number): void {
    this.globalState.connectivity.increasePointsByProgram(this.calculateDelta(threads));
  }

  calculateDelta(threads: number): number {
    const programData = programs[this.name];

    return (
      this.globalState.scenario.currentValues.programMultipliers.connectivity.pointsMultiplier *
      this.globalState.multipliers.rewards.totalMultiplier *
      threads *
      calculateTierPower(this.level, this.tier, programData.connectivity)
    );
  }
}
