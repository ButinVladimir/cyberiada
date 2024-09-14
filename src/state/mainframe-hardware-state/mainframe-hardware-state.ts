import { injectable, inject } from 'inversify';
import { EventEmitter } from 'eventemitter3';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from '@state/types';
import { PurchaseEvent } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import { calculatePow } from '@shared/helpers';
import { IMainframeHardwareState, IMainframeHardwareSerializedState } from './interfaces';
import { MAINFRAME_HARDWARE_STATE_EVENTS, MAINFRAME_HARDWARE_STATE_UI_EVENTS } from './constants';

@injectable()
export class MainframeHardwareState implements IMainframeHardwareState {
  private _scenarioState: IScenarioState;
  private _generalState: IGeneralState;
  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;

  private readonly _stateEventEmitter: EventEmitter;
  private readonly _uiEventBatcher: EventBatcher;

  private _performance: number;
  private _cores: number;
  private _ram: number;

  constructor(
    @inject(TYPES.ScenarioState) _scenarioState: IScenarioState,
    @inject(TYPES.GeneralState) _generalState: IGeneralState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
    @inject(TYPES.Formatter) _formatter: IFormatter,
  ) {
    this._scenarioState = _scenarioState;
    this._generalState = _generalState;
    this._messageLogState = _messageLogState;
    this._formatter = _formatter;

    const scenarioValues = this._scenarioState.currentValues;

    this._performance = scenarioValues.mainframeHardware.performanceLevel;
    this._cores = scenarioValues.mainframeHardware.coresLevel;
    this._ram = scenarioValues.mainframeHardware.ramLevel;

    this._stateEventEmitter = new EventEmitter();
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
    const exp = this._scenarioState.currentValues.mainframeHardware.performancePrice;
    const baseCost = calculatePow(this._performance - 1, exp);

    return (baseCost * (Math.pow(exp.base, increase) - 1)) / (exp.base - 1);
  }

  purchasePerformanceIncrease(increase: number): boolean {
    const cost = this.getPerformanceIncreaseCost(increase);

    return this._generalState.purchase(cost, this.handlePurchasePerformanceIncrease(increase));
  }

  getCoresIncreaseCost(increase: number): number {
    const exp = this._scenarioState.currentValues.mainframeHardware.coresPrice;
    const baseCost = calculatePow(this._performance - 1, exp);

    return (baseCost * (Math.pow(exp.base, increase) - 1)) / (exp.base - 1);
  }

  purchaseCoresIncrease(increase: number): boolean {
    const cost = this.getCoresIncreaseCost(increase);

    return this._generalState.purchase(cost, this.handlePurchaseCoresIncrease(increase));
  }

  getRamIncreaseCost(increase: number): number {
    const exp = this._scenarioState.currentValues.mainframeHardware.ramPrice;
    const baseCost = calculatePow(this._performance - 1, exp);

    return (baseCost * (Math.pow(exp.base, increase) - 1)) / (exp.base - 1);
  }

  purchaseRamIncrease(increase: number): boolean {
    const cost = this.getRamIncreaseCost(increase);

    return this._generalState.purchase(cost, this.handlePurchaseRamIncrease(increase));
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    const scenarioValues = this._scenarioState.currentValues;

    this._performance = scenarioValues.mainframeHardware.performanceLevel;
    this._cores = scenarioValues.mainframeHardware.coresLevel;
    this._ram = scenarioValues.mainframeHardware.ramLevel;
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

  addStateEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._stateEventEmitter.addListener(eventName, handler);
  }

  removeStateEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._stateEventEmitter.removeListener(eventName, handler);
  }

  private handlePurchasePerformanceIncrease = (increase: number) => () => {
    this._performance += increase;
    this._messageLogState.postMessage(PurchaseEvent.performanceUpdated, {
      level: this._formatter.formatNumberDecimal(this._performance),
    });
    this.handlePostHardwareUpdate();
  };

  private handlePurchaseCoresIncrease = (increase: number) => () => {
    this._cores += increase;
    this._messageLogState.postMessage(PurchaseEvent.coresUpdated, {
      level: this._formatter.formatNumberDecimal(this._cores),
    });
    this.handlePostHardwareUpdate();
  };

  private handlePurchaseRamIncrease = (increase: number) => () => {
    this._ram += increase;
    this._messageLogState.postMessage(PurchaseEvent.ramUpdated, {
      level: this._formatter.formatNumberDecimal(this._ram),
    });
    this.handlePostHardwareUpdate();
  };

  private handlePostHardwareUpdate() {
    this._stateEventEmitter.emit(MAINFRAME_HARDWARE_STATE_EVENTS.HARDWARE_UPDATED);
    this._uiEventBatcher.enqueueEvent(MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPDATED);
  }
}
