import { MAINFRAME_HARDWARE_STATE_UI_EVENTS } from '@state/mainframe-hardware-state/constants';
import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';

export class ProgramDescriptionController extends BaseController {
  hostConnected() {
    this.mainframeHardwareState.addUiEventListener(MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPDATED, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.mainframeHardwareState.removeUiEventListener(MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPDATED, this.handleRefreshUI);
  }

  getProgram(name: ProgramName, level: number, quality: number): IProgram {
    return this.programFactory.makeProgram({
      name,
      level,
      quality,
    });
  }

  handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
