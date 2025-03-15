import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';

export class ProcessDiffTextController extends BaseController {
  private _program?: IProgram;

  get ram(): number {
    return this.mainframeState.hardware.ram.level;
  }

  get cores(): number {
    return this.mainframeState.hardware.cores.level;
  }

  getProgram(name: ProgramName): IProgram | undefined {
    if (this._program?.name !== name && this._program) {
      this.removeEventListenersByEmitter(this._program);
    }

    this._program = this.mainframeState.programs.getOwnedProgramByName(name)!;

    return this._program;
  }

  getProcessByName(name: ProgramName): IProcess | undefined {
    return this.mainframeState.processes.getProcessByName(name);
  }
}
