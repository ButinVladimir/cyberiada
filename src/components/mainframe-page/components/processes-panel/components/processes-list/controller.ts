import { BaseController } from '@shared/base-controller';
import { ProgramName } from '@state/progam-factory/types';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';

export class ProcessesListController extends BaseController {
  listProcesses(): ProgramName[] {
    return this.mainframeProcessesState.listProcesses();
  }

  getProcessByProgramName(programName: ProgramName): IProcess | undefined {
    return this.mainframeProcessesState.getProcessByName(programName);
  }

  toggleAllProcesses(active: boolean) {
    this.mainframeProcessesState.toggleAllProcesses(active);
  }

  deleteAllProcesses() {
    this.mainframeProcessesState.deleteAllProcesses();
  }
}
