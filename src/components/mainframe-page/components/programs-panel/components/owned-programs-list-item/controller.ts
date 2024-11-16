import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';

export class OwnedProgramsListItemController extends BaseController {
  private _ownedProgram?: IProgram;

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
