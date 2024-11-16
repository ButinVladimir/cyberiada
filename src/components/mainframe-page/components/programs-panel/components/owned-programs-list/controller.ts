import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';

export class OwnedProgramsListController extends BaseController {
  listOwnedPrograms(): IProgram[] {
    return this.mainframeProgramsState.listOwnedPrograms();
  }

  toggleAutoupgrade(active: boolean) {
    this.mainframeProgramsState.toggleProgramsAutoUpgrade(active);
  }
}
