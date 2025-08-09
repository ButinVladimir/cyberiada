import { binarySearchDecimal } from '@shared/index';
import { type IAutomationState } from '@state/automation-state';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { AutobuyerProgramName } from '../types';
import { BaseProgram } from './base-program';
import { IProgram } from '../interfaces';

const { lazyInject } = decorators;

export class MainframeProgramsAutobuyerProgram extends BaseProgram {
  public readonly name = AutobuyerProgramName.mainframeProgramsAutobuyer;
  public readonly isAutoscalable = false;

  @lazyInject(TYPES.AutomationState)
  private _automationState!: IAutomationState;

  handlePerformanceUpdate(): void {}

  perform(threads: number): void {
    let actionsLeft = this.calculateActionCount(threads);
    let availableMoney = (this.globalState.money.money * this._automationState.mainframePrograms.moneyShare) / 100;

    for (const existingProgram of this.mainframeState.programs.listOwnedPrograms()) {
      if (actionsLeft === 0) {
        break;
      }

      if (!existingProgram.autoUpgradeEnabled) {
        continue;
      }

      const checkProgram = this.makeCheckProgramFunction(existingProgram, availableMoney);

      const newLevel = binarySearchDecimal(existingProgram.level, this.globalState.development.level, checkProgram);

      if (newLevel > existingProgram.level) {
        const cost = this.mainframeState.programs.getProgramCost(existingProgram.name, existingProgram.tier, newLevel);

        if (this.mainframeState.programs.purchaseProgram(existingProgram.name, existingProgram.tier, newLevel)) {
          availableMoney -= cost;
          actionsLeft--;
        }
      }
    }
  }

  calculateActionCount(threads: number): number {
    return (1 + this.tier) * threads;
  }

  private makeCheckProgramFunction =
    (existingProgram: IProgram, availableMoney: number) =>
    (level: number): boolean => {
      if (
        !this.globalState.availableItems.programs.isItemAvailable(existingProgram.name, existingProgram.tier, level)
      ) {
        return false;
      }

      const cost = this.mainframeState.programs.getProgramCost(existingProgram.name, existingProgram.tier, level);

      return cost <= availableMoney;
    };
}
