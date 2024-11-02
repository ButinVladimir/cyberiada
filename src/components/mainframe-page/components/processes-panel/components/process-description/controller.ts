import { BaseController } from '@shared/base-controller';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';
import { ProgramName } from '@state/progam-factory/types';
import { MAINFRAME_PROCESSES_STATE_UI_EVENTS } from '@state/mainframe/mainframe-processes-state';
import { PROGRAMS_UI_EVENTS } from '@state/progam-factory/constants';
import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';

export class ProcessDescriptionController extends BaseController {
  private _process?: IProcess;

  hostConnected() {
    this.globalState.programCompletionSpeed.addUiEventListener(
      GLOBAL_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.globalState.programCompletionSpeed.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED,
      this.handleRefreshUI,
    );
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
        this._process.program.addUiEventListener(PROGRAMS_UI_EVENTS.PROGRAM_UPDATED, this.handleRefreshUI);
      }
    }

    return this._process;
  }

  private unsubscribeFromProcess() {
    if (this._process) {
      this._process.removeUiEventListener(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_UPDATED, this.handleRefreshUI);
      this._process.program.removeUiEventListener(PROGRAMS_UI_EVENTS.PROGRAM_UPDATED, this.handleRefreshUI);
    }
  }
}
