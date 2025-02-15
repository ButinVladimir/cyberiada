import { BaseController } from '@shared/base-controller';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';
import { ProgramName } from '@state/progam-factory/types';

export class ProcessesListController extends BaseController {
  listProcesses(): IProcess[] {
    return this.mainframeState.processes.listProcesses();
  }

  toggleAllProcesses(active: boolean) {
    this.mainframeState.processes.toggleAllProcesses(active);
  }

  deleteAllProcesses() {
    this.mainframeState.processes.deleteAllProcesses();
  }

  moveProcess(programName: ProgramName, newPosition: number) {
    this.mainframeState.processes.moveProcess(programName, newPosition);
  }
}
