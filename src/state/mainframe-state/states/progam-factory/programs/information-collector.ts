import programs from '@configs/programs.json';
import { calculateQualityPower } from '@shared/helpers';
import { OtherProgramName } from '../types';
import { BaseProgram } from './base-program';

export class InformationCollectorProgram extends BaseProgram {
  public readonly name = OtherProgramName.informationCollector;
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
      calculateQualityPower(this.level, this.quality, programData.connectivity)
    );
  }
}
