import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';

export class OwnedProgramsListController extends BaseController {
  listOwnedPrograms(): IProgram[] {
    return this.mainframeState.programs.listOwnedPrograms();
  }

  toggleAutoupgrade(active: boolean) {
    this.mainframeState.programs.toggleProgramsAutoUpgrade(active);
  }

  moveProgram(programName: ProgramName, newPosition: number) {
    this.mainframeState.programs.moveProgram(programName, newPosition);
  }

  upgradeMaxAllPrograms() {
    this.mainframeState.programs.upgradeMaxAllPrograms();
  }
}
