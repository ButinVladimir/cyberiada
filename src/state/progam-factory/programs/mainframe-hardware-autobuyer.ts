import { MS_IN_SECOND } from '@shared/constants';
import { binarySearchDecimal } from '@shared/helpers';
import { IMainframeHardwareParameter } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-parameter';
import { IMainframeHardwareAutomationState } from '@state/automation/mainframe-hardware-automation-state/interfaces/mainframe-hardware-automation-state';
import { ProgramName } from '../types';
import { BaseProgram } from './base-program';
import { IMainframeHardwareAutobuyerParameters } from '../interfaces/program-parameters/mainframe-hardware-autobuyer-parameters';

export class MainframeHardwareAutobuyerProgram extends BaseProgram {
  public readonly name = ProgramName.mainframeHardwareAutobuyer;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = false;

  private _mainframeHardwareAutomationState: IMainframeHardwareAutomationState;

  constructor(parameters: IMainframeHardwareAutobuyerParameters) {
    super(parameters);

    this._mainframeHardwareAutomationState = parameters.mainframeHardwareAutomationState;
  }

  perform(threads: number): void {
    let actionsLeft = threads;
    let availableMoney = (this.globalState.money.money * this._mainframeHardwareAutomationState.moneyShare) / 100;

    for (const parameter of this.mainframeHardwareState.listParameters()) {
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

  buildProgramDescriptionParametersObject(threads: number) {
    const minAvgValue = threads / this.calculateCompletionMaxTime(threads);
    const maxAvgValue = threads / this.calculateCompletionMinTime(threads);

    return {
      value: this.formatter.formatNumberDecimal(threads),
      minAvgValue: this.formatter.formatNumberDecimal(minAvgValue * MS_IN_SECOND),
      maxAvgValue: this.formatter.formatNumberDecimal(maxAvgValue * MS_IN_SECOND),
    };
  }

  buildProcessDescriptionParametersObject(threads: number, usedCores: number) {
    const completionTime = this.calculateCompletionTime(threads, usedCores);

    const avgValue = threads / completionTime;

    return {
      value: this.formatter.formatNumberDecimal(threads),
      avgValue: this.formatter.formatNumberDecimal(avgValue * MS_IN_SECOND),
    };
  }

  private makeCheckParameterFunction =
    (parameter: IMainframeHardwareParameter, availableMoney: number) => (increase: number) =>
      parameter.checkCanPurchase(increase) && parameter.getIncreaseCost(increase) <= availableMoney;
}
