import { binarySearchDecimal } from '@shared/index';
import { type IAutomationState } from '@state/automation-state';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { OtherProgramName } from '../types';
import { BaseProgram } from './base-program';
import { IProgram } from '../interfaces';

const { lazyInject } = decorators;

export class MainframeProgramsAutobuyerProgram extends BaseProgram {
  public readonly name = OtherProgramName.mainframeProgramsAutobuyer;
  public readonly isAutoscalable = false;

  @lazyInject(TYPES.AutomationState)
  private _automationState!: IAutomationState;

  handlePerformanceUpdate(): void {}

  perform(threads: number): void {
    let actionsLeft = threads;
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
        const cost = this.mainframeState.programs.getProgramCost(
          existingProgram.name,
          existingProgram.quality,
          newLevel,
        );

        if (this.mainframeState.programs.purchaseProgram(existingProgram.name, existingProgram.quality, newLevel)) {
          availableMoney -= cost;
          actionsLeft--;
        }
      }
    }
  }

  private makeCheckProgramFunction =
    (existingProgram: IProgram, availableMoney: number) =>
    (level: number): boolean => {
      if (
        !this.globalState.availableItems.programs.isItemAvailable(existingProgram.name, existingProgram.quality, level)
      ) {
        return false;
      }

      const cost = this.mainframeState.programs.getProgramCost(existingProgram.name, existingProgram.quality, level);

      return cost <= availableMoney;
    };
}
