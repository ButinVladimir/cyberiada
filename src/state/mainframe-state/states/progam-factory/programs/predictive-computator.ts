import programs from '@configs/programs.json';
import { calculateTierLinear } from '@shared/helpers';
import { OtherProgramName } from '../types';
import { BaseProgram } from './base-program';

export class PredictiveComputatorProgram extends BaseProgram {
  public readonly name = OtherProgramName.predictiveComputator;
  public readonly isAutoscalable = true;

  handlePerformanceUpdate(): void {
    this.mainframeState.processes.processCompletionSpeed.requestMultipliersRecalculation();
  }

  perform(): void {}

  calculateProcessCompletionSpeedMultiplier(threads: number, usedRam: number): number {
    const programData = programs[this.name];

    return (
      1 +
      Math.pow(threads * usedRam, programData.autoscalableResourcesPower) *
        calculateTierLinear(this.level, this.tier, programData.speedModifier) *
        Math.pow(
          this.globalState.scenario.currentValues.mainframeSoftware.performanceBoost,
          this.mainframeState.hardware.performance.totalLevel,
        )
    );
  }
}
