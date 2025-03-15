import { BaseController } from '@shared/base-controller';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';

export class ProcessDescriptionTextController extends BaseController {
  private _process?: IProcess;

  get availableRam(): number {
    return this.mainframeState.processes.availableRam;
  }

  getProcess(programName: ProgramName) {
    if (this._process?.program.name !== programName) {
      if (this._process) {
        this.removeEventListenersByEmitter(this._process);
      }

      this._process = this.mainframeState.processes.getProcessByName(programName);
    }

    return this._process;
  }
}
