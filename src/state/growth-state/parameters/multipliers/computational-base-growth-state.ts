import { injectable } from 'inversify';
import { MultiplierProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { CircuitDesignerProgram } from '@state/mainframe-state/states/progam-factory/programs/circuit-designer';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';
import { BaseMultiplierGrowthState } from './base-multiplier-growth-state';

@injectable()
export class ComputationalBaseGrowthState extends BaseMultiplierGrowthState {
  getProgramName() {
    return MultiplierProgramName.circuitDesigner;
  }

  handleUpdateByProgram(process: IProcess) {
    const program = process.program as CircuitDesignerProgram;

    this._growthByProgram =
      (program.calculateDelta(process.threads) * process.calculateCompletionDelta(1)) / process.maxCompletionPoints;
  }
}
