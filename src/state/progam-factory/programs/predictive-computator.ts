import programs from '@configs/programs.json';
import { ProgramName } from '../types';
import { BaseProgram } from './base-program';

export class PredictiveComputatorProgram extends BaseProgram {
  public readonly name = ProgramName.predictiveComputator;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = true;

  perform(): void {}

  buildProgramDescriptionParametersObject(threads: number, usedRam: number) {
    return {
      value: this.formatter.formatNumberLong(this.calculateProgramCompletionSpeedMultiplier(threads, usedRam)),
    };
  }

  buildProcessDescriptionParametersObject(threads: number, usedCores: number, usedRam: number) {
    return {
      value: this.formatter.formatNumberLong(this.calculateProgramCompletionSpeedMultiplier(usedCores, usedRam)),
    };
  }

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
            (this.mainframeHardwareState.performance.level - 1) *
              this.scenarioState.currentValues.mainframeSoftware.performanceBoost),
    );
  }
}
