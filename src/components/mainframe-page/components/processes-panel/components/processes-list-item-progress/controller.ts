import { BaseController } from '@shared/base-controller';
import { IProcess } from '@state/mainframe-processes-state/interfaces/process';
import { MAINFRAME_PROCESSES_STATE_UI_EVENTS } from '@state/mainframe-processes-state/constants';
import { ProgramName } from '@state/progam-factory/types';

export class ProcessesListItemProgressController extends BaseController {
  private _process?: IProcess;

  hostConnected() {}

  hostDisconnected() {
    this.removeOldProcessListeners();
  }

  getProcess(programName: ProgramName) {
    if (this._process?.program.name !== programName) {
      this.removeOldProcessListeners();

      this._process = this.mainframeProcessesState.getProcessByName(programName);

      this._process?.addUiEventListener(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_UPDATED, this.handleRefreshUI);
      this._process?.addUiEventListener(
        MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_PROGRESS_UPDATED,
        this.handleRefreshUI,
      );
    }

    return this._process;
  }

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };

  private removeOldProcessListeners() {
    this._process?.removeUiEventListener(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_UPDATED, this.handleRefreshUI);
    this._process?.removeUiEventListener(
      MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_PROGRESS_UPDATED,
      this.handleRefreshUI,
    );
  }
}
