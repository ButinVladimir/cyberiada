import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';

export class ProgramDescriptionTextController extends BaseController {
  private _ownedProgram?: IProgram;

  get ram(): number {
    return this.mainframeHardwareState.ram.level;
  }

  get cores(): number {
    return this.mainframeHardwareState.cores.level;
  }

  getProgram(programName: ProgramName) {
    if (this._ownedProgram?.name !== programName) {
      if (this._ownedProgram) {
        this.removeEventListenersByEmitter(this._ownedProgram);
      }

      this._ownedProgram = this.mainframeProgramsState.getOwnedProgramByName(programName);
    }

    return this._ownedProgram;
  }
}
