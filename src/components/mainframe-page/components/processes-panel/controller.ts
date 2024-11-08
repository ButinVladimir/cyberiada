import { MAINFRAME_PROCESSES_STATE_UI_EVENTS } from '@state/mainframe/mainframe-processes-state/constants';
import { MAINFRAME_HARDWARE_STATE_UI_EVENTS } from '@state/mainframe/mainframe-hardware-state/constants';
import { BaseController } from '@shared/base-controller';

export class ProcessesPanelController extends BaseController {
  hostConnected() {
    this.mainframeProcessesState.addUiEventListener(
      MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPDATED,
      this.handleRefreshUI,
    );
    this.mainframeProcessesState.addUiEventListener(
      MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.mainframeProcessesState.removeUiEventListener(
      MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPDATED,
      this.handleRefreshUI,
    );
    this.mainframeOwnedProgramState.removeUiEventListener(
      MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED,
      this.handleRefreshUI,
    );
  }

  get availableCores(): number {
    return this.mainframeProcessesState.availableCores;
  }

  get availableRam(): number {
    return this.mainframeProcessesState.availableRam;
  }
}
