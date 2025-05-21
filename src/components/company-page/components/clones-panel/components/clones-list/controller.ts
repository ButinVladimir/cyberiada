import { IClone } from '@state/company-state/states/clone-factory/interfaces/clone';
import { BaseController } from '@shared/base-controller';

export class ClonesListController extends BaseController {
  listClones(): IClone[] {
    return this.companyState.clones.listClones();
  }

  toggleAutoupgrade(active: boolean) {
    this.companyState.clones.toggleAllClonesAutoupgrade(active);
  }

  moveClone(cloneId: string, newPosition: number) {
    this.companyState.clones.moveClone(cloneId, newPosition);
  }

  deleteAllClones() {
    this.companyState.clones.deleteAllClones();
  }

  upgradeMaxAllLevels() {
    this.companyState.clones.upgradeMaxAllLevels();
  }
}
