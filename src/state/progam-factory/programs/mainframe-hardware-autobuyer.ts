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

    actionsLeft -= this.handleParameterIncrease(
      actionsLeft,
      this.mainframeHardwareState.performance,
      this._mainframeHardwareAutomationState.performanceShare,
    );
    actionsLeft -= this.handleParameterIncrease(
      actionsLeft,
      this.mainframeHardwareState.cores,
      this._mainframeHardwareAutomationState.coresShare,
    );
    this.handleParameterIncrease(
      actionsLeft,
      this.mainframeHardwareState.ram,
      this._mainframeHardwareAutomationState.ramShare,
    );
  }

  buildProgramDescriptionParametersObject(threads: number) {
    const completionTimes = this.buildCompletionTimeParametersObject(threads);

    const minAvgValue = threads / completionTimes.maxTime;
    const maxAvgValue = threads / completionTimes.minTime;

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

  private handleParameterIncrease(maxIncrease: number, parameter: IMainframeHardwareParameter, share: number): number {
    const availableMoney = (this.globalState.money.money * share) / 100;

    const handleCheck = (increase: number) =>
      parameter.checkCanPurchase(increase) && parameter.getIncreaseCost(increase) <= availableMoney;

    const increase = binarySearchDecimal(0, maxIncrease, handleCheck);

    if (increase > 0 && parameter.purchase(increase)) {
      return increase;
    }

    return 0;
  }
}
