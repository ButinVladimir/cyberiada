import { APP_UI_EVENTS } from '@state/app/constants';
import { MAINFRAME_PROCESSES_STATE_UI_EVENTS } from '@state/mainframe/mainframe-processes-state/constants';
import { BaseController } from '@shared/base-controller';
import { ProgramName } from '@state/progam-factory/types';

export class ProcessesListController extends BaseController {
  hostConnected() {
    this.app.addUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleRefreshUI);
    this.mainframeProcessesState.addUiEventListener(
      MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.app.removeUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleRefreshUI);
    this.mainframeOwnedProgramState.removeUiEventListener(
      MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED,
      this.handleRefreshUI,
    );
  }

  listProcesses(): ProgramName[] {
    return this.mainframeProcessesState.listProcesses();
  }
}
