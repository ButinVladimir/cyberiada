import { binarySearchDecimal } from '@shared/index';
import { type IAutomationState } from '@state/automation-state';
import { IClone, type ICompanyState } from '@state/company-state';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { AutobuyerProgramName } from '../types';
import { BaseProgram } from './base-program';

const { lazyInject } = decorators;

export class CloneLevelAutoupgraderProgram extends BaseProgram {
  public readonly name = AutobuyerProgramName.cloneLevelAutoupgrader;
  public readonly isAutoscalable = false;

  @lazyInject(TYPES.AutomationState)
  private _automationState!: IAutomationState;

  @lazyInject(TYPES.CompanyState)
  private _companyState!: ICompanyState;

  handlePerformanceUpdate(): void {}

  perform(threads: number): void {
    let actionsLeft = threads;
    let availableMoney = (this.globalState.money.money * this._automationState.cloneLevel.moneyShare) / 100;

    for (const clone of this._companyState.clones.listClones()) {
      if (actionsLeft === 0) {
        break;
      }

      if (!clone.autoUpgradeEnabled) {
        continue;
      }

      const checkParameter = this.makeCheckParameterFunction(clone, availableMoney);

      const newLevel = binarySearchDecimal(clone.level, this.globalState.development.level, checkParameter);

      if (newLevel > clone.level) {
        const cost = this._companyState.clones.getCloneCost(clone.templateName, clone.tier, newLevel);

        if (clone.purchaseLevelUpgrade(newLevel)) {
          availableMoney -= cost;
          actionsLeft--;
        }
      }
    }
  }

  private makeCheckParameterFunction = (clone: IClone, availableMoney: number) => (level: number) => {
    if (!this.globalState.availableItems.cloneTemplates.isItemAvailable(clone.templateName, clone.tier, level)) {
      return false;
    }

    const cost = this._companyState.clones.getCloneCost(clone.templateName, clone.tier, level);

    return cost <= availableMoney;
  };
}
