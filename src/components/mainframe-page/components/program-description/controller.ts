import { MAINFRAME_HARDWARE_STATE_UI_EVENTS } from '@state/mainframe-hardware-state/constants';
import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';
import { PROGRAM_UI_EVENTS } from '@/state/progam-factory/constants';

export class ProgramDescriptionController extends BaseController {
  private _program?: IProgram;

  hostConnected() {
    this.mainframeHardwareState.addUiEventListener(
      MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPDATED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.mainframeHardwareState.removeUiEventListener(
      MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPDATED,
      this.handleRefreshUI,
    );

    this.deleteOldProgram();
  }

  get ram(): number {
    return this.mainframeHardwareState.ram;
  }

  get cores(): number {
    return this.mainframeHardwareState.cores;
  }

  getProgram(name: ProgramName, level: number, quality: number): IProgram {
    if (this._program?.name !== name || this._program.level !== level || this._program.quality !== quality) {
      this.deleteOldProgram();

      this._program = this.programFactory.makeProgram({
        name,
        level,
        quality,
      });

      this._program.addUiEventListener(PROGRAM_UI_EVENTS.PROGRAM_UPDATED, this.handleRefreshUI);
    }

    return this._program;
  }

  handleRefreshUI = () => {
    this.host.requestUpdate();
  };

  private deleteOldProgram() {
    if (this._program) {
      this.programFactory.deleteProgram(this._program);
    }
  }
}
