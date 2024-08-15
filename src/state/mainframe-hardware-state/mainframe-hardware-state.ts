import { injectable, inject } from 'inversify';
import constants from '@configs/constants.json';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import { TYPES } from '@state/types';
import { EventBatcher } from '@shared/event-batcher';
import { IMainframeHardwareState, IMainframeHardwareSerializedState } from './interfaces';

@injectable()
export class MainframeHardwareState implements IMainframeHardwareState {
  private _generalState: IGeneralState;
  private readonly _uiEventBatcher: EventBatcher;

  private _performance: number;
  private _cores: number;
  private _ram: number;

  constructor(@inject(TYPES.GeneralState) _generalState: IGeneralState) {
    this._generalState = _generalState;

    this._performance = constants.startingSettings.mainframe.performanceLevel;
    this._cores = constants.startingSettings.mainframe.coresLevel;
    this._ram = constants.startingSettings.mainframe.ramLevel;

    this._uiEventBatcher = new EventBatcher();
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

  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._uiEventBatcher.addListener(eventName, handler);
  }

  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._uiEventBatcher.removeListener(eventName, handler);
  }

  fireUiEvents() {
    this._uiEventBatcher.fireEvents();
  }

  private handlePurchasePerformanceIncrease = (increase: number) => () => {
    this._performance += increase;
  };

  private handlePurchaseCoresIncrease = (increase: number) => () => {
    this._cores += increase;
  };

  private handlePurchaseRamIncrease = (increase: number) => () => {
    this._ram += increase;
  };
}
