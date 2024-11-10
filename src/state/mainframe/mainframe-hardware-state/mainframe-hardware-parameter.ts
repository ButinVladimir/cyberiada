import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { calculatePow } from '@shared/helpers';
import { IExponent } from '@shared/interfaces/exponent';
import { PurchaseEvent, PurchaseType } from '@shared/types';
import {
  IMainframeHardwareParameter,
  IMainframeHardwareParameterArguments,
  IMainframeHardwareState,
} from './interfaces';

export abstract class MainframeHardwareParameter implements IMainframeHardwareParameter {
  protected mainframeHardwareState: IMainframeHardwareState;
  protected scenarioState: IScenarioState;
  protected globalState: IGlobalState;
  protected messageLogState: IMessageLogState;
  protected formatter: IFormatter;

  protected _level: number;

  constructor(parameters: IMainframeHardwareParameterArguments) {
    this.mainframeHardwareState = parameters.mainframeHardwareState;
    this.scenarioState = parameters.scenarioState;
    this.globalState = parameters.globalState;
    this.messageLogState = parameters.messageLogState;
    this.formatter = parameters.formatter;

    this._level = 0;
  }

  get level() {
    return this._level;
  }

  protected abstract get priceExp(): IExponent;

  protected abstract get purchaseEvent(): PurchaseEvent;

  getIncreaseCost(increase: number): number {
    const exp = this.priceExp;
    const baseCost = calculatePow(this.level - 1, exp);

    return (
      ((1 - this.globalState.computationalBase.discount) * (baseCost * (Math.pow(exp.base, increase) - 1))) /
      (exp.base - 1)
    );
  }

  purchase(increase: number): boolean {
    if (!this.checkCanPurchase(increase)) {
      return false;
    }

    const cost = this.getIncreaseCost(increase);

    return this.globalState.money.purchase(cost, PurchaseType.mainframeHardware, this.handlePurchaseIncrease(increase));
  }

  checkCanPurchase(increase: number): boolean {
    const maxIncrease = this.globalState.cityDevelopment.level - this.level;

    if (increase > maxIncrease) {
      return false;
    }

    const cost = this.getIncreaseCost(increase);

    return cost <= this.globalState.money.money;
  }

  abstract startNewState(): Promise<void>;

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: number): Promise<void> {
    this._level = serializedState;
  }

  serialize(): number {
    return this._level;
  }

  private handlePurchaseIncrease = (increase: number) => () => {
    this._level += increase;
    this.messageLogState.postMessage(this.purchaseEvent, {
      level: this.formatter.formatNumberDecimal(this.level),
    });

    this.mainframeHardwareState.emitUpgradedEvent();
  };
}
