import programs from '@configs/programs.json';
import { MultiplierProgramName } from '../types';
import { BaseProgram } from './base-program';

export class CircuitDesignerProgram extends BaseProgram {
  public readonly name = MultiplierProgramName.circuitDesigner;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = false;

  perform(threads: number): void {
    this.globalState.computationalBase.increasePointsByProgram(this.calculateDelta(threads));
  }

  calculateDelta(threads: number): number {
    const programData = programs[this.name];

    return (
      this.globalState.scenario.currentValues.programMultipliers.computationalBase.pointsPerCompletion *
      threads *
      programData.computationalBaseLevelMultiplier *
      this.level *
      Math.pow(programData.computationalBaseQualityMultiplier, this.quality)
    );
  }
}
