import { injectable } from 'inversify';
import { MultiplierProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { InformationCollectorProgram } from '@state/mainframe-state/states/progam-factory/programs/information-collector';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';
import { BaseMultiplierGrowthState } from './base-multiplier-growth-state';

@injectable()
export class ConnectivityGrowthState extends BaseMultiplierGrowthState {
  getProgramName() {
    return MultiplierProgramName.informationCollector;
  }

  handleUpdateByProgram(process: IProcess) {
    const program = process.program as InformationCollectorProgram;

    this._growthByProgram =
      (program.calculateDelta(process.threads) * process.calculateCompletionDelta(1)) / process.maxCompletionPoints;
  }
}
