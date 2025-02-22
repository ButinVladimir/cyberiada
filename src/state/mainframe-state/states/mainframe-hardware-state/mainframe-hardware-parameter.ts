import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { calculatePow } from '@shared/helpers';
import { IExponent } from '@shared/interfaces/exponent';
import { Feature, PurchaseEvent, PurchaseType } from '@shared/types';
import { binarySearchDecimal } from '@shared/helpers';
import {
  IMainframeHardwareParameter,
  IMainframeHardwareParameterArguments,
  IMainframeHardwareState,
  IMainframeHardwareParameterSerializedState,
} from './interfaces';
import { MainframeHardwareParameterType } from './types';
import { MAINFRAME_HARDWARE_STATE_UI_EVENTS } from './constants';

export abstract class MainframeHardwareParameter implements IMainframeHardwareParameter {
  protected stateUiConnector: IStateUIConnector;
  protected mainframeHardwareState: IMainframeHardwareState;
  protected globalState: IGlobalState;
  protected messageLogState: IMessageLogState;
  protected formatter: IFormatter;

  protected _level: number;
  protected _autoUpgradeEnabled: boolean;

  constructor(parameters: IMainframeHardwareParameterArguments) {
    this.stateUiConnector = parameters.stateUiConnector;
    this.mainframeHardwareState = parameters.mainframeHardwareState;
    this.globalState = parameters.globalState;
    this.messageLogState = parameters.messageLogState;
    this.formatter = parameters.formatter;

    this._level = 0;
    this._autoUpgradeEnabled = true;
  }

  get level() {
    return this._level;
  }

  get autoUpgradeEnabled() {
    this.stateUiConnector.connectEventHandler(
      this.mainframeHardwareState,
      MAINFRAME_HARDWARE_STATE_UI_EVENTS.AUTOBUYER_UPDATED,
    );

    return this._autoUpgradeEnabled;
  }

  set autoUpgradeEnabled(value: boolean) {
    this._autoUpgradeEnabled = value;

    this.mainframeHardwareState.emitAutobuyerUpdatedEvent();
  }

  abstract get type(): MainframeHardwareParameterType;

  protected abstract get priceExp(): IExponent;

  protected abstract get purchaseEvent(): PurchaseEvent;

  getIncreaseCost(increase: number): number {
    const exp = this.priceExp;
    const baseCost = calculatePow(this.level - 1, exp);

    return (
      (baseCost * (Math.pow(exp.base, increase) - 1)) /
      (exp.base - 1) /
      this.globalState.multipliers.connectivity.totalMultiplier /
      this.globalState.multipliers.computationalBase.totalMultiplier
    );
  }

  purchase(increase: number): boolean {
    if (!this.checkCanPurchase(increase)) {
      return false;
    }

    const cost = this.getIncreaseCost(increase);

    return this.globalState.money.purchase(cost, PurchaseType.mainframeHardware, this.handlePurchaseIncrease(increase));
  }

  purchaseMax(): boolean {
    const maxIncrease = this.globalState.development.level - this.level;

    if (maxIncrease <= 0) {
      return false;
    }

    const increase = binarySearchDecimal(0, maxIncrease, this.checkCanPurchase);

    return this.purchase(increase);
  }

  checkCanPurchase = (increase: number): boolean => {
    if (increase <= 0) {
      return false;
    }

    if (!this.globalState.unlockedFeatures.isFeatureUnlocked(Feature.mainframeHardware)) {
      return false;
    }

    const maxIncrease = this.globalState.development.level - this.level;

    if (increase > maxIncrease) {
      return false;
    }

    const cost = this.getIncreaseCost(increase);

    return cost <= this.globalState.money.money;
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._autoUpgradeEnabled = true;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IMainframeHardwareParameterSerializedState): Promise<void> {
    this._level = serializedState.level;
    this._autoUpgradeEnabled = serializedState.autoUpgradeEnabled;
  }

  serialize(): IMainframeHardwareParameterSerializedState {
    return {
      level: this._level,
      autoUpgradeEnabled: this._autoUpgradeEnabled,
    };
  }

  private handlePurchaseIncrease = (increase: number) => () => {
    this._level += increase;
    this.messageLogState.postMessage(this.purchaseEvent, {
      level: this.formatter.formatNumberDecimal(this.level),
    });

    this.mainframeHardwareState.emitUpgradedEvent();
  };
}
