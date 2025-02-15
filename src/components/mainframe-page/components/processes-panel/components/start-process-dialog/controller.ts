import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';

export class StartProcessDialogController extends BaseController {
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

  listPrograms(): IProgram[] {
    return this.mainframeState.programs.listOwnedPrograms();
  }

  getProgram(name: ProgramName): IProgram | undefined {
    if (this._program?.name !== name && this._program) {
      this.removeEventListenersByEmitter(this._program);
    }

    this._program = this.mainframeState.programs.getOwnedProgramByName(name)!;

    return this._program;
  }

  getRunningScalableProgram(): IProcess | undefined {
    return this.mainframeState.processes.runningScalableProcess;
  }

  getProcessByName(name: ProgramName): IProcess | undefined {
    return this.mainframeState.processes.getProcessByName(name);
  }

  startProcess(name: ProgramName, threads: number): boolean {
    return this.mainframeState.processes.addProcess(name, threads);
  }
}
