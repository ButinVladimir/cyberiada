import { injectable } from 'inversify';
import { MultiplierProgramName, ProgramName, CircuitDesignerProgram, IProcess } from '@state/mainframe-state';
import { ISidejob } from '@state/company-state';
import { BaseMultiplierGrowthState } from './base-multiplier-growth-state';

@injectable()
export class ComputationalBaseGrowthState extends BaseMultiplierGrowthState {
  getProgramName(): ProgramName {
    return MultiplierProgramName.circuitDesigner;
  }

  getGrowthByProgram(process: IProcess): number {
    const program = process.program as CircuitDesignerProgram;

    return program.calculateDelta(process.threads) / process.calculateCompletionTime();
  }

  getGrowthBySidejob(sidejob: ISidejob): number {
    return sidejob.calculateComputationalBaseDelta(1);
  }
}
