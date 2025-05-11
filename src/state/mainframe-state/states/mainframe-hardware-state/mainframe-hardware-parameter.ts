import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { calculateGeometricProgressionSum } from '@shared/helpers';
import { IExponent } from '@shared/interfaces/formulas/exponent';
import { Feature, PurchaseType } from '@shared/types';
import { binarySearchDecimal } from '@shared/helpers';
import {
  IMainframeHardwareParameter,
  IMainframeHardwareParameterArguments,
  IMainframeHardwareState,
  IMainframeHardwareParameterSerializedState,
} from './interfaces';
import { MainframeHardwareParameterType } from './types';

export abstract class MainframeHardwareParameter implements IMainframeHardwareParameter {
  private UI_EVENTS = {
    HARDWARE_UPGRADED: Symbol('HARDWARE_UPGRADED'),
    HARDWARE_AUTOBUYER_UPDATED: Symbol('HARDWARE_AUTOBUYER_UPDATED'),
  };

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

    this.stateUiConnector.registerEvents(this.UI_EVENTS);
  }

  get level() {
    this.stateUiConnector.connectEventHandler(this.UI_EVENTS.HARDWARE_UPGRADED);

    return this._level;
  }

  protected abstract get baseLevel(): number;

  get totalLevel() {
    this.stateUiConnector.connectEventHandler(this.UI_EVENTS.HARDWARE_UPGRADED);

    return this._level + this.baseLevel;
  }

  get autoUpgradeEnabled() {
    this.stateUiConnector.connectEventHandler(this.UI_EVENTS.HARDWARE_AUTOBUYER_UPDATED);

    return this._autoUpgradeEnabled;
  }

  set autoUpgradeEnabled(value: boolean) {
    this._autoUpgradeEnabled = value;

    this.stateUiConnector.enqueueEvent(this.UI_EVENTS.HARDWARE_AUTOBUYER_UPDATED);
  }

  abstract get type(): MainframeHardwareParameterType;

  protected abstract get priceExp(): IExponent;

  protected abstract postPurchaseMessge(): void;

  getIncreaseCost(increase: number): number {
    const exp = this.priceExp;

    return (
      (calculateGeometricProgressionSum(this.level + increase - 1, exp.multiplier, exp.base) -
        calculateGeometricProgressionSum(this.level - 1, exp.multiplier, exp.base)) /
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

    if (!this.globalState.unlockedFeatures.isFeatureUnlocked(Feature.mainframeUpgrades)) {
      return false;
    }

    const maxIncrease = this.globalState.development.level - this.level;

    if (increase > maxIncrease) {
      return false;
    }

    const cost = this.getIncreaseCost(increase);

    return cost <= this.globalState.money.money;
  };

  async startNewState(): Promise<void> {
    this._autoUpgradeEnabled = true;
    this._level = 0;
  }

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
    this.postPurchaseMessge();

    this.mainframeHardwareState.emitUpgradedEvent();
    this.stateUiConnector.enqueueEvent(this.UI_EVENTS.HARDWARE_UPGRADED);
  };
}
