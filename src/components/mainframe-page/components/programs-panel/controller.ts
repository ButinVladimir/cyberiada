import { BaseController } from '@shared/base-controller';

export class ProgramsPanelController extends BaseController {
  upgradeMaxAllPrograms() {
    this.mainframeProgramsState.upgradeMaxAllPrograms();
  }
}
