import { IExponent } from '@shared/interfaces/exponent';
import { calculatePow } from '@shared/helpers';
import programs from '@configs/programs.json';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { ProgramName } from '../types';
import { ICodeGeneratorParameters } from '../interfaces/program-parameters/code-generator-parameters';
import { BaseProgram } from './base-program';

export class CodeGeneratorProgram extends BaseProgram {
  public readonly name = ProgramName.codeGenerator;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = false;

  private _scenarioState: IScenarioState;

  constructor(parameters: ICodeGeneratorParameters) {
    super(parameters);

    this._scenarioState = parameters.scenarioState;
  }

  perform(threads: number): void {
    this.growthState.increaseCodebaseByProgram(this.calculateDelta(threads));
  }

  buildDescriptionParametersObject(threads: number) {
    const delta = this.calculateDelta(threads);

    return {
      value: this.formatter.formatNumberLong(delta),
    };
  }

  calculateDelta(threads: number): number {
    const programData = programs[this.name];

    return (
      this._scenarioState.currentValues.pointsByProgramMultipliers.program *
      threads *
      calculatePow(this.level - 1, programData.codebase as IExponent) *
      Math.pow(programData.codebaseQualityMultiplier, this.quality)
    );
  }
}
