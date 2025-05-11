import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';

export class StartProcessDialogButtonsController extends BaseController {
  private _program?: IProgram;

  getAvailableRamForProgram(programName?: ProgramName): number {
    let availableRam = this.mainframeState.processes.availableRam;

    if (programName) {
      const existingProcess = this.mainframeState.processes.getProcessByName(programName);

      if (existingProcess) {
        availableRam += existingProcess.totalRam;
      }
    }

    return availableRam;
  }

  getProgram(name: ProgramName): IProgram | undefined {
    this._program = this.mainframeState.programs.getOwnedProgramByName(name)!;

    return this._program;
  }

  getRunningScalableProgram(): IProcess | undefined {
    return this.mainframeState.processes.runningScalableProcess;
  }

  getProcessByName(name: ProgramName): IProcess | undefined {
    return this.mainframeState.processes.getProcessByName(name);
  }
}
