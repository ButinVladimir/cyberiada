import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';

export class ProgramDescriptionController extends BaseController {
  private _program?: IProgram;

  hostDisconnected() {
    super.hostDisconnected();

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
    }

    return this._program;
  }

  private deleteOldProgram() {
    if (this._program) {
      this.removeEventListenersByEmitter(this._program);
      this.programFactory.deleteProgram(this._program);
    }
  }
}
