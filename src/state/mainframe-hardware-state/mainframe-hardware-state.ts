import { injectable, inject } from 'inversify';
import constants from '@configs/constants.json';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { TYPES } from '@state/types';
import { PurchaseEvent } from '@shared/types';
import { IMainframeHardwareState, IMainframeHardwareSerializedState } from './interfaces';

@injectable()
export class MainframeHardwareState implements IMainframeHardwareState {
  private _generalState: IGeneralState;
  private _messageLogState: IMessageLogState;

  private _performance: number;
  private _cores: number;
  private _ram: number;

  constructor(
    @inject(TYPES.GeneralState) _generalState: IGeneralState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
  ) {
    this._generalState = _generalState;
    this._messageLogState = _messageLogState;

    this._performance = constants.startingSettings.mainframe.performanceLevel;
    this._cores = constants.startingSettings.mainframe.coresLevel;
    this._ram = constants.startingSettings.mainframe.ramLevel;
  }

  get performance() {
    return this._performance;
  }

  get cores() {
    return this._cores;
  }

  get ram() {
    return this._ram;
  }

  getPerformanceIncreaseCost(increase: number): number {
    const baseCost =
      constants.mainframeHardware.performanceBaseCost *
      Math.pow(constants.mainframeHardware.performanceCostMultiplier, this.performance - 1);

    return (
      (baseCost * (Math.pow(constants.mainframeHardware.performanceCostMultiplier, increase) - 1)) /
      (constants.mainframeHardware.performanceCostMultiplier - 1)
    );
  }

  purchasePerformanceIncrease(increase: number): boolean {
    const cost = this.getPerformanceIncreaseCost(increase);

    return this._generalState.purchase(cost, this.handlePurchasePerformanceIncrease(increase));
  }

  getCoresIncreaseCost(increase: number): number {
    const baseCost =
      constants.mainframeHardware.coresBaseCost *
      Math.pow(constants.mainframeHardware.coresCostMultiplier, this.cores - 1);

    return (
      (baseCost * (Math.pow(constants.mainframeHardware.coresCostMultiplier, increase) - 1)) /
      (constants.mainframeHardware.coresCostMultiplier - 1)
    );
  }

  purchaseCoresIncrease(increase: number): boolean {
    const cost = this.getCoresIncreaseCost(increase);

    return this._generalState.purchase(cost, this.handlePurchaseCoresIncrease(increase));
  }

  getRamIncreaseCost(increase: number): number {
    const baseCost =
      constants.mainframeHardware.ramBaseCost * Math.pow(constants.mainframeHardware.ramCostMultiplier, this.ram - 1);

    return (
      (baseCost * (Math.pow(constants.mainframeHardware.ramCostMultiplier, increase) - 1)) /
      (constants.mainframeHardware.ramCostMultiplier - 1)
    );
  }

  purchaseRamIncrease(increase: number): boolean {
    const cost = this.getRamIncreaseCost(increase);

    return this._generalState.purchase(cost, this.handlePurchaseRamIncrease(increase));
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._performance = constants.startingSettings.mainframe.performanceLevel;
    this._cores = constants.startingSettings.mainframe.coresLevel;
    this._ram = constants.startingSettings.mainframe.ramLevel;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IMainframeHardwareSerializedState): Promise<void> {
    this._performance = serializedState.performance;
    this._cores = serializedState.cores;
    this._ram = serializedState.ram;
  }

  serialize(): IMainframeHardwareSerializedState {
    return {
      performance: this.performance,
      cores: this.cores,
      ram: this.ram,
    };
  }

  private handlePurchasePerformanceIncrease = (increase: number) => () => {
    this._performance += increase;
    this._messageLogState.postMessage(PurchaseEvent.performanceUpdated, { level: this._performance });
  };

  private handlePurchaseCoresIncrease = (increase: number) => () => {
    this._cores += increase;
    this._messageLogState.postMessage(PurchaseEvent.coresUpdated, { level: this._cores });
  };

  private handlePurchaseRamIncrease = (increase: number) => () => {
    this._ram += increase;
    this._messageLogState.postMessage(PurchaseEvent.ramUpdated, { level: this._ram });
  };
}
