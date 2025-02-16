import programs from '@configs/programs.json';
import { MultiplierProgramName } from '../types';
import { BaseProgram } from './base-program';

export class InformationCollectorProgram extends BaseProgram {
  public readonly name = MultiplierProgramName.informationCollector;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = false;

  perform(threads: number): void {
    this.globalState.connectivity.increasePointsByProgram(this.calculateDelta(threads));
  }

  calculateDelta(threads: number): number {
    const programData = programs[this.name];

    return (
      this.globalState.scenario.currentValues.programMultipliers.connectivity.pointsPerCompletion *
      threads *
      programData.connectivityLevelMultiplier *
      this.level *
      Math.pow(programData.connectivityQualityMultiplier, this.quality)
    );
  }
}
