import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';

export class ProcessDiffTextController extends BaseController {
  private _program?: IProgram;

  get maxRam(): number {
    return this.mainframeState.hardware.ram.totalLevel;
  }

  get availableRam(): number {
    return this.mainframeState.processes.availableRam;
  }

  get maxCores(): number {
    return this.mainframeState.hardware.cores.totalLevel;
  }

  getProgram(name: ProgramName): IProgram | undefined {
    this._program = this.mainframeState.programs.getOwnedProgramByName(name)!;

    return this._program;
  }

  getProcessByName(name: ProgramName): IProcess | undefined {
    return this.mainframeState.processes.getProcessByName(name);
  }
}
