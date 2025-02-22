import { injectable } from 'inversify';
import { MultiplierProgramName } from '@state/progam-factory/types';
import { CodeGeneratorProgram } from '@state/progam-factory/programs/code-generator';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';
import { BaseMultiplierGrowthState } from './base-multiplier-growth-state';

@injectable()
export class CodeBaseGrowthState extends BaseMultiplierGrowthState {
  getProgramName() {
    return MultiplierProgramName.codeGenerator;
  }

  handleUpdateByProgram(process: IProcess) {
    const program = process.program as CodeGeneratorProgram;

    this._growthByProgram =
      (program.calculateDelta(process.threads) * process.calculateCompletionDelta(1)) / process.maxCompletionPoints;
  }
}
