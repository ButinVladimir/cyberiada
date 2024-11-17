import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';

export class OwnedProgramsListController extends BaseController {
  listOwnedPrograms(): IProgram[] {
    return this.mainframeProgramsState.listOwnedPrograms();
  }

  toggleAutoupgrade(active: boolean) {
    this.mainframeProgramsState.toggleProgramsAutoUpgrade(active);
  }

  moveProgram(programName: ProgramName, newPosition: number) {
    this.mainframeProgramsState.moveProgram(programName, newPosition);
  }
}
