import programs from '@configs/programs.json';
import { calculateQualityLinear } from '@shared/helpers';
import { OtherProgramName } from '../types';
import { BaseProgram } from './base-program';

export class PredictiveComputatorProgram extends BaseProgram {
  public readonly name = OtherProgramName.predictiveComputator;
  public readonly isAutoscalable = true;

  handlePerformanceUpdate(): void {
    for (const process of this.mainframeState.processes.listProcesses()) {
      if (process.program.name === OtherProgramName.predictiveComputator) {
        continue;
      }

      process.program.handlePerformanceUpdate();
    }

    this.growthState.programCompletionSpeed.requestMultipliersRecalculation();
  }

  perform(): void {}

  calculateProgramCompletionSpeedMultiplier(threads: number, usedRam: number): number {
    const programData = programs[this.name];

    return Math.max(
      1,
      1 +
        Math.pow(threads * usedRam, programData.autoscalableResourcesPower) *
          calculateQualityLinear(this.level, this.quality, programData.speedModifier) *
          (1 +
            (this.mainframeState.hardware.performance.level - 1) *
              this.globalState.scenario.currentValues.mainframeSoftware.performanceBoost),
    );
  }
}
