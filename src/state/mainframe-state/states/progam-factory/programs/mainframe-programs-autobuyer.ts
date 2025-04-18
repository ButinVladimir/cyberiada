import { binarySearchDecimal } from '@shared/helpers';
import { IAutomationState } from '@state/automation-state/interfaces/automation-state';
import { OtherProgramName } from '../types';
import { BaseProgram } from './base-program';
import {
  IMainframeProgramsAutobuyerParameters,
  IMakeProgramParameters,
  IProgram,
  IProgramFactory,
} from '../interfaces';

export class MainframeProgramsAutobuyerProgram extends BaseProgram {
  public readonly name = OtherProgramName.mainframeProgramsAutobuyer;
  public readonly isAutoscalable = false;

  private _programFactory: IProgramFactory;
  private _automationState: IAutomationState;

  constructor(parameters: IMainframeProgramsAutobuyerParameters) {
    super(parameters);

    this._programFactory = parameters.programFactory;
    this._automationState = parameters.automationState;
  }

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
        const programParameters: IMakeProgramParameters = {
          level: newLevel,
          name: existingProgram.name,
          quality: existingProgram.quality,
          autoUpgradeEnabled: existingProgram.autoUpgradeEnabled,
        };

        const newProgram = this._programFactory.makeProgram(programParameters);
        newProgram.removeAllEventListeners();

        if (this.mainframeState.programs.purchaseProgram(programParameters)) {
          availableMoney -= newProgram.cost;
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

      const newProgram = this._programFactory.makeProgram({
        level,
        name: existingProgram.name,
        quality: existingProgram.quality,
        autoUpgradeEnabled: existingProgram.autoUpgradeEnabled,
      });
      newProgram.removeAllEventListeners();

      const canAfford = newProgram.cost <= availableMoney;

      return canAfford;
    };
}
