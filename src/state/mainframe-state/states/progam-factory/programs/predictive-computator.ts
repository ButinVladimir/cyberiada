import programs from '@configs/programs.json';
import { OtherProgramName } from '../types';
import { BaseProgram } from './base-program';

export class PredictiveComputatorProgram extends BaseProgram {
  public readonly name = OtherProgramName.predictiveComputator;
  public readonly isAutoscalable = true;

  handlePerformanceUpdate(): void {
    this.growthState.programCompletionSpeed.requestMultipliersRecalculation();
  }

  perform(): void {}

  calculateProgramCompletionSpeedMultiplier(threads: number, usedRam: number): number {
    const programData = programs[this.name];

    return Math.max(
      1,
      1 +
        Math.pow(threads * usedRam, programData.scalableResourcesModifier) *
          programData.speedModifierLevelMultiplier *
          this.level *
          Math.pow(programData.speedModifierQualityMultiplier, this.quality) *
          (1 +
            (this.mainframeState.hardware.performance.level - 1) *
              this.globalState.scenario.currentValues.mainframeSoftware.performanceBoost),
    );
  }
}
