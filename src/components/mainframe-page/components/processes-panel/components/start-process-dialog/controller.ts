import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';

export class StartProcessDialogController extends BaseController {
  private _program?: IProgram;

  getAvailableRamForProgram(programName?: ProgramName): number {
    let availableRam = this.mainframeProcessesState.availableRam;

    if (programName) {
      const existingProcess = this.mainframeProcessesState.getProcessByName(programName);

      if (existingProcess) {
        availableRam += existingProcess.totalRam;
      }
    }

    return availableRam;
  }

  listPrograms(): IProgram[] {
    return this.mainframeProgramsState.listOwnedPrograms();
  }

  getProgram(name: ProgramName): IProgram | undefined {
    if (this._program?.name !== name && this._program) {
      this.removeEventListenersByEmitter(this._program);
    }

    this._program = this.mainframeProgramsState.getOwnedProgramByName(name)!;

    return this._program;
  }

  getRunningScalableProgram(): IProcess | undefined {
    return this.mainframeProcessesState.runningScalableProcess;
  }

  getProcessByName(name: ProgramName): IProcess | undefined {
    return this.mainframeProcessesState.getProcessByName(name);
  }

  startProcess(name: ProgramName, threads: number): boolean {
    return this.mainframeProcessesState.addProcess(name, threads);
  }
}
