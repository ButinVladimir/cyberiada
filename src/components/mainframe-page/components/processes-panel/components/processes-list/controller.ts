import { BaseController } from '@shared/base-controller';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';
import { ProgramName } from '@state/progam-factory/types';

export class ProcessesListController extends BaseController {
  listProcesses(): IProcess[] {
    return this.mainframeProcessesState.listProcesses();
  }

  toggleAllProcesses(active: boolean) {
    this.mainframeProcessesState.toggleAllProcesses(active);
  }

  deleteAllProcesses() {
    this.mainframeProcessesState.deleteAllProcesses();
  }

  moveProcess(programName: ProgramName, newPosition: number) {
    this.mainframeProcessesState.moveProcess(programName, newPosition);
  }
}
