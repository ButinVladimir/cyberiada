import { binarySearchDecimal } from '@shared/index';
import { IMainframeHardwareParameter } from '@state/mainframe-state';
import { type IAutomationState } from '@state/automation-state';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { OtherProgramName } from '../types';
import { BaseProgram } from './base-program';

const { lazyInject } = decorators;

export class MainframeHardwareAutobuyerProgram extends BaseProgram {
  public readonly name = OtherProgramName.mainframeHardwareAutobuyer;
  public readonly isAutoscalable = false;

  @lazyInject(TYPES.AutomationState)
  private _automationState!: IAutomationState;

  handlePerformanceUpdate(): void {}

  perform(threads: number): void {
    let actionsLeft = threads;
    let availableMoney = (this.globalState.money.money * this._automationState.mainframeHardware.moneyShare) / 100;

    for (const parameter of this.mainframeState.hardware.listParameters()) {
      if (actionsLeft === 0) {
        break;
      }

      if (!parameter.autoUpgradeEnabled) {
        continue;
      }

      const checkParameter = this.makeCheckParameterFunction(parameter, availableMoney);

      const increase = binarySearchDecimal(0, actionsLeft, checkParameter);
      const cost = parameter.getIncreaseCost(increase);

      if (increase > 0 && parameter.purchase(increase)) {
        actionsLeft -= increase;
        availableMoney -= cost;
      }
    }
  }

  private makeCheckParameterFunction =
    (parameter: IMainframeHardwareParameter, availableMoney: number) => (increase: number) =>
      parameter.checkCanPurchase(increase) && parameter.getIncreaseCost(increase) <= availableMoney;
}
