import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';

export class OwnedProgramsListItemController extends BaseController {
  private _ownedProgram?: IProgram;

  getProgram(programName: ProgramName) {
    if (this._ownedProgram?.name !== programName) {
      if (this._ownedProgram) {
        this.removeEventListenersByEmitter(this._ownedProgram);
      }

      this._ownedProgram = this.mainframeState.programs.getOwnedProgramByName(programName);
    }

    return this._ownedProgram;
  }

  upgradeMaxProgram(programName: ProgramName) {
    this.mainframeState.programs.upgradeMaxProgram(programName);
  }
}
