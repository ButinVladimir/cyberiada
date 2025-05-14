import { injectable } from 'inversify';
import { MultiplierProgramName, ProgramName, DealMakerProgram, IProcess } from '@state/mainframe-state';
import { ISidejob } from '@state/company-state';
import { BaseMultiplierGrowthState } from './base-multiplier-growth-state';

@injectable()
export class RewardsGrowthState extends BaseMultiplierGrowthState {
  getProgramName(): ProgramName {
    return MultiplierProgramName.dealMaker;
  }

  getGrowthByProgram(process: IProcess): number {
    const program = process.program as DealMakerProgram;

    return program.calculateDelta(process.threads) / process.calculateCompletionTime();
  }

  getGrowthBySidejob(sidejob: ISidejob): number {
    return sidejob.calculateRewardsDelta(1);
  }
}
