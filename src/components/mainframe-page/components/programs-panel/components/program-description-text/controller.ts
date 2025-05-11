import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';

export class ProgramDescriptionTextController extends BaseController {
  private _ownedProgram?: IProgram;

  get ram(): number {
    return this.mainframeState.hardware.ram.totalLevel;
  }

  get cores(): number {
    return this.mainframeState.hardware.cores.totalLevel;
  }

  getProgram(programName: ProgramName) {
    if (this._ownedProgram?.name !== programName) {
      this._ownedProgram = this.mainframeState.programs.getOwnedProgramByName(programName);
    }

    return this._ownedProgram;
  }
}
