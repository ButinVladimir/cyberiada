import { APP_UI_EVENTS } from '@state/app/constants';
import { MAINFRAME_PROCESSES_STATE_UI_EVENTS } from '@state/mainframe-processes-state/constants';
import { BaseController } from '@shared/base-controller';
import { IProcess } from '@state/mainframe-processes-state/interfaces/process';

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

  listProcesses(): IProcess[] {
    return this.mainframeProcessesState.listProcesses();
  }

  handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
