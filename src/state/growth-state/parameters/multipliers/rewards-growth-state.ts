import { injectable } from 'inversify';
import { MultiplierProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { DealMakerProgram } from '@state/mainframe-state/states/progam-factory/programs/deal-maker';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';
import { BaseMultiplierGrowthState } from './base-multiplier-growth-state';

@injectable()
export class RewardsGrowthState extends BaseMultiplierGrowthState {
  getProgramName() {
    return MultiplierProgramName.dealMaker;
  }

  handleUpdateByProgram(process: IProcess) {
    const program = process.program as DealMakerProgram;

    this._growthByProgram = program.calculateDelta(process.threads) / process.calculateCompletionTime();
  }
}
