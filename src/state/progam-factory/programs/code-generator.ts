import { IExponent } from '@shared/interfaces/exponent';
import { calculatePow } from '@shared/helpers';
import programs from '@configs/programs.json';
import { ProgramName } from '../types';
import { ICodeGeneratorParameters } from '../interfaces/program-parameters/code-generator-parameters';
import { BaseProgram } from './base-program';

export class CodeGeneratorProgram extends BaseProgram {
  public readonly name = ProgramName.codeGenerator;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = false;

  constructor(parameters: ICodeGeneratorParameters) {
    super(parameters);
  }

  perform(threads: number): void {}

  buildDescriptionParametersObject(threads: number) {
    const delta = this.calculateDelta(threads);

    return {
      value: this.formatter.formatNumberLong(delta),
    };
  }

  calculateDelta(threads: number): number {
    const programData = programs[this.name];

    return (
      threads *
      calculatePow(this.level - 1, programData.dpIncrease as IExponent) *
      Math.pow(programData.dpIncreaseQualityMultiplier, this.quality)
    );
  }
}
