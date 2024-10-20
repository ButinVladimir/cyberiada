import { injectable, inject } from 'inversify';
import { decorators } from '@state/container';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import type { IGrowthState } from '@state/growth-state/interfaces/growth-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from '@state/types';
import { PurchaseEvent, PurchaseType } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import { calculatePow } from '@shared/helpers';
import { IMainframeHardwareState, IMainframeHardwareSerializedState } from './interfaces';
import { MAINFRAME_HARDWARE_STATE_UI_EVENTS } from './constants';

const { lazyInject } = decorators;

@injectable()
export class MainframeHardwareState implements IMainframeHardwareState {
  @lazyInject(TYPES.MainframeProcessesState)
  private _mainframeProcessesState!: IMainframeProcessesState;

  @lazyInject(TYPES.GrowthState)
  private _growthState!: IGrowthState;

  private _scenarioState: IScenarioState;
  private _generalState: IGeneralState;
  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;

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

    return ((1 - this._growthState.programDiscount) * (baseCost * (Math.pow(exp.base, increase) - 1))) / (exp.base - 1);
  }

  purchasePerformanceIncrease(increase: number): boolean {
    const maxIncrease = this._generalState.cityLevel - this.performance;
    if (increase > maxIncrease) {
      throw new Error('Mainframe hardware performance level cannot be above city level');
    }

    const cost = this.getPerformanceIncreaseCost(increase);

    return this._generalState.purchase(
      cost,
      PurchaseType.mainframeHardware,
      this.handlePurchasePerformanceIncrease(increase),
    );
  }

  getCoresIncreaseCost(increase: number): number {
    const exp = this._scenarioState.currentValues.mainframeHardware.coresPrice;
    const baseCost = calculatePow(this._performance - 1, exp);

    return ((1 - this._growthState.programDiscount) * (baseCost * (Math.pow(exp.base, increase) - 1))) / (exp.base - 1);
  }

  purchaseCoresIncrease(increase: number): boolean {
    const maxIncrease = this._generalState.cityLevel - this.cores;
    if (increase > maxIncrease) {
      throw new Error('Mainframe hardware cores level cannot be above city level');
    }

    const cost = this.getCoresIncreaseCost(increase);

    return this._generalState.purchase(
      cost,
      PurchaseType.mainframeHardware,
      this.handlePurchaseCoresIncrease(increase),
    );
  }

  getRamIncreaseCost(increase: number): number {
    const exp = this._scenarioState.currentValues.mainframeHardware.ramPrice;
    const baseCost = calculatePow(this._performance - 1, exp);

    return ((1 - this._growthState.programDiscount) * (baseCost * (Math.pow(exp.base, increase) - 1))) / (exp.base - 1);
  }

  purchaseRamIncrease(increase: number): boolean {
    const maxIncrease = this._generalState.cityLevel - this.ram;
    if (increase > maxIncrease) {
      throw new Error('Mainframe hardware RAM level cannot be above city level');
    }

    const cost = this.getRamIncreaseCost(increase);

    return this._generalState.purchase(cost, PurchaseType.mainframeHardware, this.handlePurchaseRamIncrease(increase));
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

  private handlePurchasePerformanceIncrease = (increase: number) => () => {
    this._performance += increase;
    this._messageLogState.postMessage(PurchaseEvent.performanceUpgraded, {
      level: this._formatter.formatNumberDecimal(this._performance),
    });
    this.handlePostHardwareUpdate();
  };

  private handlePurchaseCoresIncrease = (increase: number) => () => {
    this._cores += increase;
    this._messageLogState.postMessage(PurchaseEvent.coresUpgraded, {
      level: this._formatter.formatNumberDecimal(this._cores),
    });
    this.handlePostHardwareUpdate();
  };

  private handlePurchaseRamIncrease = (increase: number) => () => {
    this._ram += increase;
    this._messageLogState.postMessage(PurchaseEvent.ramUpgraded, {
      level: this._formatter.formatNumberDecimal(this._ram),
    });
    this.handlePostHardwareUpdate();
  };

  private handlePostHardwareUpdate() {
    this._mainframeProcessesState.requestUpdateProcesses();
    this._growthState.requestRecalculation();
    this._uiEventBatcher.enqueueEvent(MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPDATED);
  }
}
