import { IClone } from '@state/company-state/states/clone-factory/interfaces/clone';
import { BaseController } from '@shared/base-controller';

export class ClonesListUpgradeButtonsController extends BaseController {
  checkCanUpgradeMaxAllLevels(): boolean {
    return this.companyState.clones.listClones().some(this.checkCanUpgradeMaxLevel);
  }

  upgradeMaxAllLevels() {
    this.companyState.clones.upgradeMaxAllLevels();
  }

  private checkCanUpgradeMaxLevel = (clone: IClone) => {
    if (!clone.autoUpgradeEnabled) {
      return false;
    }

    if (
      !this.globalState.availableItems.cloneTemplates.isItemAvailable(clone.templateName, clone.tier, clone.level + 1)
    ) {
      return false;
    }

    return (
      this.globalState.money.money >=
      this.companyState.clones.getCloneCost(clone.templateName, clone.tier, clone.level + 1)
    );
  };
}
