import { binarySearchDecimal } from '@shared/helpers';
import { IMainframeProgramsAutomationState } from '@state/automation/mainframe-programs-automation-state/interfaces/mainframe-programs-automation-state';
import { ProgramName } from '../types';
import { BaseProgram } from './base-program';
import {
  IMainframeProgramsAutobuyerParameters,
  IMakeProgramParameters,
  IProgram,
  IProgramFactory,
} from '../interfaces';

export class MainframeProgramsAutobuyerProgram extends BaseProgram {
  public readonly name = ProgramName.mainframeProgramsAutobuyer;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = false;

  private _programFactory: IProgramFactory;
  private _mainframeProgramsAutomationState: IMainframeProgramsAutomationState;

  constructor(parameters: IMainframeProgramsAutobuyerParameters) {
    super(parameters);

    this._programFactory = parameters.programFactory;
    this._mainframeProgramsAutomationState = parameters.mainframeProgramsAutomationState;
  }

  perform(threads: number): void {
    let actionsLeft = threads;
    let availableMoney = (this.globalState.money.money * this._mainframeProgramsAutomationState.moneyShare) / 100;

    for (const existingProgram of this.mainframeProgramsState.listOwnedPrograms()) {
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

        if (this.mainframeProgramsState.purchaseProgram(programParameters)) {
          availableMoney -= newProgram.cost;
          actionsLeft--;
        }
      }
    }
  }

  private makeCheckProgramFunction =
    (existingProgram: IProgram, availableMoney: number) =>
    (level: number): boolean => {
      const newProgram = this._programFactory.makeProgram({
        level,
        name: existingProgram.name,
        quality: existingProgram.quality,
        autoUpgradeEnabled: existingProgram.autoUpgradeEnabled,
      });

      const canAfford = newProgram.cost <= availableMoney;

      return canAfford;
    };
}
