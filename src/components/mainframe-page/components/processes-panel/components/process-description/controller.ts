import { BaseController } from '@shared/base-controller';
import { IProcess } from '@state/mainframe-processes-state/interfaces/process';
import { ProgramName } from '@state/progam-factory/types';
import { MAINFRAME_PROCESSES_STATE_UI_EVENTS } from '@state/mainframe-processes-state';

export class ProcessDescriptionController extends BaseController {
  private _process?: IProcess;

  hostConnected() {}

  hostDisconnected() {
    this.unsubscribeFromProcess();
  }

  get availableRam(): number {
    return this.mainframeProcessesState.availableRam;
  }

  get availableCores(): number {
    return this.mainframeProcessesState.availableCores;
  }

  getProcess(name: ProgramName): IProcess | undefined {
    if (this._process?.program.name !== name) {
      this.unsubscribeFromProcess();

      this._process = this.mainframeProcessesState.getProcessByName(name);

      if (this._process) {
        this._process.addUiEventListener(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_UPDATED, this.handleRefreshUI);
      }
    }

    return this._process;
  }

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };

  private unsubscribeFromProcess() {
    if (this._process) {
      this._process.removeUiEventListener(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_UPDATED, this.handleRefreshUI);
    }
  }
}
