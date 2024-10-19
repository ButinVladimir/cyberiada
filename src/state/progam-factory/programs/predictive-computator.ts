import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import programs from '@configs/programs.json';
import { ProgramName } from '../types';
import { IPredictiveComputatorParameters } from '../interfaces/program-parameters/predictive-computator-parameters';
import { BaseProgram } from './base-program';

export class PredictiveComputatorProgram extends BaseProgram {
  public readonly name = ProgramName.predictiveComputator;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = true;

  private _scenarioState: IScenarioState;

  constructor(parameters: IPredictiveComputatorParameters) {
    super(parameters);

    this._scenarioState = parameters.scenarioState;
  }

  perform(): void {}

  buildDescriptionParametersObject(threads: number, usedRam: number) {
    return {
      value: this.calculateProgramCompletionSpeedMultiplier(threads, usedRam),
    };
  }

  calculateProgramCompletionSpeedMultiplier(threads: number, usedRam: number): number {
    const programData = programs[this.name];

    return Math.max(
      1,
      (1 +
        threads *
          usedRam *
          programData.speedModifierLevelMultiplier *
          this.level *
          Math.pow(programData.speedModifierQualityMultiplier, this.quality)) *
        (1 +
          (this.mainframeHardwareState.performance - 1) *
            this._scenarioState.currentValues.mainframeSoftware.performanceBoost),
    );
  }
}
