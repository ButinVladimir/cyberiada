import { BaseController } from '@shared/base-controller';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';

export class ProcessesListItemController extends BaseController {
  private _process?: IProcess;

  get availableRam(): number {
    return this.mainframeState.processes.availableRam;
  }

  getProcess(programName: ProgramName) {
    if (this._process?.program.name !== programName) {
      this._process = this.mainframeState.processes.getProcessByName(programName);
    }

    return this._process;
  }

  toggleProcess(): void {
    this._process?.toggleActive(!this._process.isActive);
  }

  deleteProcessByName(programName: ProgramName): void {
    this.mainframeState.processes.deleteProcess(programName);
  }
}
