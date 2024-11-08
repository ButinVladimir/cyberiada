import { MAINFRAME_PROCESSES_STATE_UI_EVENTS } from '@state/mainframe/mainframe-processes-state/constants';
import { BaseController } from '@shared/base-controller';
import { ProgramName } from '@state/progam-factory/types';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';

export class ProcessesListController extends BaseController {
  hostConnected() {
    this.mainframeProcessesState.addUiEventListener(
      MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.mainframeOwnedProgramState.removeUiEventListener(
      MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED,
      this.handleRefreshUI,
    );
  }

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
