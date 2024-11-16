import { BaseController } from '@shared/base-controller';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';
import { ProgramName } from '@state/progam-factory/types';

export class ProcessesListItemProgressController extends BaseController {
  private _process?: IProcess;

  getProcess(programName: ProgramName) {
    if (this._process?.program.name !== programName) {
      if (this._process) {
        this.removeEventListenersByEmitter(this._process);
      }

      this._process = this.mainframeProcessesState.getProcessByName(programName);
    }

    return this._process;
  }
}
