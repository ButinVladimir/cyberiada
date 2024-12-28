import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';

export class ProcessDiffTextController extends BaseController {
  private _program?: IProgram;

  get ram(): number {
    return this.mainframeHardwareState.ram.level;
  }

  get cores(): number {
    return this.mainframeHardwareState.cores.level;
  }

  getProgram(name: ProgramName): IProgram | undefined {
    if (this._program?.name !== name && this._program) {
      this.removeEventListenersByEmitter(this._program);
    }

    this._program = this.mainframeProgramsState.getOwnedProgramByName(name)!;

    return this._program;
  }

  getProcessByName(name: ProgramName): IProcess | undefined {
    return this.mainframeProcessesState.getProcessByName(name);
  }
}
