import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';
import { PROGRAMS_UI_EVENTS } from '@state/progam-factory/constants';
import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';
import { MAINFRAME_HARDWARE_STATE_UI_EVENTS } from '@state/mainframe/mainframe-hardware-state/constants';

export class ProgramDescriptionController extends BaseController {
  private _program?: IProgram;

  hostConnected() {
    this.globalState.computationalBase.addUiEventListener(
      GLOBAL_STATE_UI_EVENTS.MAINFRAME_DISCOUNT_CHANGED,
      this.handleRefreshUI,
    );
    this.globalState.cityDevelopment.addUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_LEVEL_CHANGED,
      this.handleRefreshUI,
    );
    this.mainframeHardwareState.addUiEventListener(
      MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPGRADED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.globalState.computationalBase.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.MAINFRAME_DISCOUNT_CHANGED,
      this.handleRefreshUI,
    );
    this.globalState.cityDevelopment.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_LEVEL_CHANGED,
      this.handleRefreshUI,
    );
    this.mainframeHardwareState.removeUiEventListener(
      MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPGRADED,
      this.handleRefreshUI,
    );
    this.deleteOldProgram();
  }

  get ram(): number {
    return this.mainframeHardwareState.ram.level;
  }

  get cores(): number {
    return this.mainframeHardwareState.cores.level;
  }

  getProgram(name: ProgramName, level: number, quality: number): IProgram {
    if (this._program?.name !== name || this._program.level !== level || this._program.quality !== quality) {
      this.deleteOldProgram();

      this._program = this.programFactory.makeProgram({
        name,
        level,
        quality,
        autoUpgradeEnabled: true,
      });

      this._program.addUiEventListener(PROGRAMS_UI_EVENTS.PROGRAM_UPGRADED, this.handleRefreshUI);
    }

    return this._program;
  }

  private deleteOldProgram() {
    if (this._program) {
      this.programFactory.deleteProgram(this._program);
    }
  }
}
