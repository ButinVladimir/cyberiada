import { binarySearchDecimal } from '@shared/helpers';
import { IMainframeHardwareParameter } from '@state/mainframe-state/states/mainframe-hardware-state/interfaces/mainframe-hardware-parameter';
import { IAutomationState } from '@state/automation-state/interfaces/automation-state';
import { ProgramName } from '../types';
import { BaseProgram } from './base-program';
import { IMainframeHardwareAutobuyerParameters } from '../interfaces/program-parameters/mainframe-hardware-autobuyer-parameters';

export class MainframeHardwareAutobuyerProgram extends BaseProgram {
  public readonly name = ProgramName.mainframeHardwareAutobuyer;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = false;

  private _automationState: IAutomationState;

  constructor(parameters: IMainframeHardwareAutobuyerParameters) {
    super(parameters);

    this._automationState = parameters.automationState;
  }

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
