import { BaseController } from '@shared/base-controller';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';
import { ProgramName } from '@state/progam-factory/types';

export class ProcessDescriptionController extends BaseController {
  private _process?: IProcess;

  get availableRam(): number {
    return this.mainframeProcessesState.availableRam;
  }

  get availableCores(): number {
    return this.mainframeProcessesState.availableCores;
  }

  getProcess(name: ProgramName): IProcess | undefined {
    if (this._process?.program.name !== name) {
      if (this._process) {
        this.removeEventListenersByEmitter(this._process);
        this.removeEventListenersByEmitter(this._process.program);
      }

      this._process = this.mainframeProcessesState.getProcessByName(name);
    }

    return this._process;
  }
}
