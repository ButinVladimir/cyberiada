import { BaseController } from '@shared/base-controller';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';

export class ProcessesListItemProgressController extends BaseController {
  private _process?: IProcess;

  getProcess(programName: ProgramName) {
    if (this._process?.program.name !== programName) {
      this._process = this.mainframeState.processes.getProcessByName(programName);
    }

    return this._process;
  }
}
