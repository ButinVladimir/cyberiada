import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';
import { PROGRAMS_UI_EVENTS } from '@/state/progam-factory/constants';

export class ProgramDescriptionController extends BaseController {
  private _program?: IProgram;

  hostConnected() {}

  hostDisconnected() {
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

      this._program.addUiEventListener(PROGRAMS_UI_EVENTS.PROGRAM_UPDATED, this.handleRefreshUI);
    }

    return this._program;
  }

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };

  private deleteOldProgram() {
    if (this._program) {
      this._program.removeEventListeners();
      this.programFactory.deleteProgram(this._program);
    }
  }
}
