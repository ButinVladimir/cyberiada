import { injectable, inject } from 'inversify';
import { EventBatcher } from '@shared/event-batcher';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { TYPES } from '@state/types';
import { IncomeSource, PurchaseType } from '@shared/types';
import { IGeneralState, IGeneralSerializedState } from './interfaces';
import { GameSpeed } from './types';
import { GENERAL_STATE_UI_EVENTS } from './constants';

@injectable()
export class GeneralState implements IGeneralState {
  private _scenarioState: IScenarioState;
  private _settingsState: ISettingsState;
  private readonly _uiEventBatcher: EventBatcher;

  private _randomSeed: number;
  private _lastUpdateTime: number;
  private _offlineTime: number;
  private _gameSpeed: GameSpeed;
  private _timeThisRun: number;
  private _timeTotal: number;
  private _money: number;
  private _cityLevel: number;
  private _cityDevelopmentPoints: number;
  private _moneyIncome: Map<IncomeSource, number>;
  private _cityDevelopmentPointsIncome: Map<IncomeSource, number>;
  private _moneyExpenses: Map<PurchaseType, number>;

  constructor(
    @inject(TYPES.ScenarioState) _scenarioState: IScenarioState,
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
  ) {
    this._scenarioState = _scenarioState;
    this._settingsState = _settingsState;

    this._randomSeed = 0;
    this._lastUpdateTime = 0;
    this._offlineTime = 0;
    this._gameSpeed = GameSpeed.normal;
    this._timeThisRun = 0;
    this._timeTotal = 0;
    this._money = this._scenarioState.currentValues.startingMoney;
    this._cityLevel = this._scenarioState.currentValues.startingCityLevel;
    this._cityDevelopmentPoints = 0;
    this._moneyIncome = new Map<IncomeSource, number>();
    this._cityDevelopmentPointsIncome = new Map<IncomeSource, number>();
    this._moneyExpenses = new Map<PurchaseType, number>();

    this._uiEventBatcher = new EventBatcher();
  }

  get randomSeed() {
    return this._randomSeed;
  }

  get lastUpdateTime() {
    return this._lastUpdateTime;
  }

  get offlineTime() {
    return this._offlineTime;
  }

  get gameSpeed() {
    return this._gameSpeed;
  }

  get timeThisRun() {
    return this._timeThisRun;
  }

  get timeTotal() {
    return this._timeTotal;
  }

  get money() {
    return this._money;
  }

  get cityLevel() {
    return this._cityLevel;
  }

  get cityDevelopmentPoints() {
    return this._cityDevelopmentPoints;
  }

  changeGameSpeed(gameSpeed: GameSpeed) {
    this._gameSpeed = gameSpeed;
  }

  updateLastUpdateTime() {
    const updateTime = Date.now();
    this._offlineTime += updateTime - this.lastUpdateTime;
    this._lastUpdateTime = updateTime;
  }

  decreaseOfflineTimeByTick(): boolean {
    if (this._offlineTime >= this._settingsState.updateInterval) {
      this._offlineTime -= this._settingsState.updateInterval;
      this._uiEventBatcher.enqueueEvent(GENERAL_STATE_UI_EVENTS.BONUS_TIME_CHANGED);

      return true;
    }

    return false;
  }

  increaseTime() {
    this._timeThisRun += this._settingsState.updateInterval;
    this._timeTotal += this._settingsState.updateInterval;

    this._uiEventBatcher.enqueueEvent(GENERAL_STATE_UI_EVENTS.VALUES_CHANGED);
  }

  increaseMoney(moneyDelta: number, incomeSource: IncomeSource) {
    this._money += moneyDelta;

    const prevIncome = this.getMoneyIncome(incomeSource);
    this._moneyIncome.set(incomeSource, prevIncome + moneyDelta);

    this._uiEventBatcher.enqueueEvent(GENERAL_STATE_UI_EVENTS.MONEY_CHANGED);
    this._uiEventBatcher.enqueueEvent(GENERAL_STATE_UI_EVENTS.VALUES_CHANGED);
  }

  purchase(cost: number, purchaseType: PurchaseType, handler: () => void): boolean {
    if (this._money >= cost) {
      this._money -= cost;
      handler();

      const prevExpenses = this.getMoneyExpenses(purchaseType);
      this._moneyExpenses.set(purchaseType, prevExpenses + cost);

      this._uiEventBatcher.enqueueEvent(GENERAL_STATE_UI_EVENTS.MONEY_CHANGED);
      this._uiEventBatcher.enqueueEvent(GENERAL_STATE_UI_EVENTS.VALUES_CHANGED);

      return true;
    }

    return false;
  }

  increaseCityDevelopmentPoints(delta: number, incomeSource: IncomeSource) {
    this._cityDevelopmentPoints += delta;

    const prevIncome = this.getCityDevelopmentPointsIncome(incomeSource);
    this._cityDevelopmentPointsIncome.set(incomeSource, prevIncome + delta);

    const { base, baseMultiplier } = this._scenarioState.currentValues.cityLevelRequirements;
    const newCityLevel =
      Math.floor(Math.log(1 + (this._cityDevelopmentPoints * (base - 1)) / baseMultiplier) / Math.log(base)) + 1;

    if (newCityLevel > this._cityLevel) {
      this._cityLevel = newCityLevel;

      this._uiEventBatcher.enqueueEvent(GENERAL_STATE_UI_EVENTS.CITY_LEVEL_CHANGED);
    }

    this._uiEventBatcher.enqueueEvent(GENERAL_STATE_UI_EVENTS.VALUES_CHANGED);
  }

  getMoneyIncome(incomeSource: IncomeSource): number {
    return this._moneyIncome.get(incomeSource) ?? 0;
  }

  getCityDevelopmentPointsIncome(incomeSource: IncomeSource): number {
    return this._cityDevelopmentPointsIncome.get(incomeSource) ?? 0;
  }

  getMoneyExpenses(purchaseType: PurchaseType): number {
    return this._moneyExpenses.get(purchaseType) ?? 0;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._randomSeed = Date.now();
    this._lastUpdateTime = Date.now();
    this._offlineTime = 0;
    this._gameSpeed = GameSpeed.normal;
    this._timeThisRun = 0;
    this._timeTotal = 0;
    this._money = this._scenarioState.currentValues.startingMoney;
    this._cityLevel = this._scenarioState.currentValues.startingCityLevel;
    this._cityDevelopmentPoints = 0;
    this._moneyIncome.clear();
    this._cityDevelopmentPointsIncome.clear();
    this._moneyExpenses.clear();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IGeneralSerializedState): Promise<void> {
    this._randomSeed = serializedState.randomSeed;
    this._lastUpdateTime = serializedState.lastUpdateTime;
    this._offlineTime = serializedState.offlineTime;
    this._gameSpeed = serializedState.gameSpeed;
    this._timeThisRun = serializedState.timeThisRun;
    this._timeTotal = serializedState.timeTotal;
    this._money = serializedState.money;
    this._cityLevel = serializedState.cityLevel;
    this._cityDevelopmentPoints = serializedState.cityDevelopmentPoints;

    this._moneyIncome.clear();
    Object.entries(serializedState.moneyIncome).forEach(([incomeSource, value]) => {
      this._moneyIncome.set(incomeSource as IncomeSource, value);
    });

    this._cityDevelopmentPointsIncome.clear();
    Object.entries(serializedState.cityDevelopmentPointsIncome).forEach(([incomeSource, value]) => {
      this._cityDevelopmentPointsIncome.set(incomeSource as IncomeSource, value);
    });

    this._moneyExpenses.clear();
    Object.entries(serializedState.moneyExpenses).forEach(([purchaseType, value]) => {
      this._moneyExpenses.set(purchaseType as PurchaseType, value);
    });

    this.updateLastUpdateTime();
  }

  serialize(): IGeneralSerializedState {
    return {
      randomSeed: this.randomSeed,
      lastUpdateTime: this.lastUpdateTime,
      offlineTime: this.offlineTime,
      gameSpeed: this.gameSpeed,
      timeThisRun: this.timeThisRun,
      timeTotal: this.timeTotal,
      money: this._money,
      cityLevel: this.cityLevel,
      cityDevelopmentPoints: this.cityDevelopmentPoints,
      moneyIncome: Object.fromEntries(this._moneyIncome.entries()) as Record<IncomeSource, number>,
      cityDevelopmentPointsIncome: Object.fromEntries(this._cityDevelopmentPointsIncome.entries()) as Record<
        IncomeSource,
        number
      >,
      moneyExpenses: Object.fromEntries(this._moneyExpenses.entries()) as Record<PurchaseType, number>,
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
}
