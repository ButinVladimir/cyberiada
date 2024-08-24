import { injectable, inject } from 'inversify';
import { decorators } from '@state/container';
import constants from '@configs/constants.json';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IMainframeProcessesState } from '@state/mainframe-processes-state/interfaces/mainframe-processes-state';
import { TYPES } from '@state/types';
import { PurchaseEvent } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import { IMainframeHardwareState, IMainframeHardwareSerializedState } from './interfaces';
import { MAINFRAME_HARDWARE_STATE_UI_EVENTS } from './constants';

const { lazyInject } = decorators;

@injectable()
export class MainframeHardwareState implements IMainframeHardwareState {
  private _generalState: IGeneralState;
  private _messageLogState: IMessageLogState;

  @lazyInject(TYPES.MainframeProcessesState)
  private _mainframeProcessesState!: IMainframeProcessesState;

  private readonly _uiEventBatcher: EventBatcher;

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
    this._messageLogState.postMessage(PurchaseEvent.performanceUpdated, { level: this._performance });
    this.handlePostUpdate();
  };

  private handlePurchaseCoresIncrease = (increase: number) => () => {
    this._cores += increase;
    this._messageLogState.postMessage(PurchaseEvent.coresUpdated, { level: this._cores });
    this.handlePostUpdate();
  };

  private handlePurchaseRamIncrease = (increase: number) => () => {
    this._ram += increase;
    this._messageLogState.postMessage(PurchaseEvent.ramUpdated, { level: this._ram });
    this.handlePostUpdate();
  };

  private handlePostUpdate() {
    this._mainframeProcessesState.updateRunningProcesses();
    this._uiEventBatcher.enqueueEvent(MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPDATED);
    this._uiEventBatcher.fireEvents();
  }
}
