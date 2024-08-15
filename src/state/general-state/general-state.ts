import { injectable, inject } from 'inversify';
import { EventBatcher } from '@shared/event-batcher';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import constants from '@configs/constants.json';
import { TYPES } from '@state/types';
import { IGeneralState, IGeneralSerializedState } from './interfaces';
import { GameSpeed } from './types';
import { GENERAL_STATE_UI_EVENTS } from './constants';

@injectable()
export class GeneralState implements IGeneralState {
  private _settingsState: ISettingsState;
  private readonly _uiEventBatcher: EventBatcher;

  private _randomSeed: number;
  private _lastUpdateTime: number;
  private _bonusTime: number;
  private _gameSpeed: GameSpeed;
  private _money: number;

  constructor(@inject(TYPES.SettingsState) _settingsState: ISettingsState) {
    this._settingsState = _settingsState;

    this._randomSeed = 0;
    this._lastUpdateTime = 0;
    this._bonusTime = 0;
    this._gameSpeed = GameSpeed.normal;
    this._money = constants.startingSettings.money;

    this._uiEventBatcher = new EventBatcher();
  }

  get randomSeed() {
    return this._randomSeed;
  }

  get lastUpdateTime() {
    return this._lastUpdateTime;
  }

  get bonusTime() {
    return this._bonusTime;
  }

  get gameSpeed() {
    return this._gameSpeed;
  }

  get money() {
    return this._money;
  }

  changeGameSpeed(gameSpeed: GameSpeed) {
    this._gameSpeed = gameSpeed;
  }

  updateLastUpdateTime() {
    const updateTime = Date.now();
    this._bonusTime += updateTime - this.lastUpdateTime;
    this._lastUpdateTime = updateTime;
  }

  decreaseBonusTimeByTick(): boolean {
    if (this._bonusTime >= this._settingsState.updateInterval) {
      this._bonusTime -= this._settingsState.updateInterval;

      return true;
    }

    return false;
  }

  increaseMoney(moneyDelta: number) {
    this._money += moneyDelta;
  }

  purchase(cost: number, handler: () => void): boolean {
    if (this._money >= cost) {
      this.increaseMoney(-cost);
      handler();

      this._uiEventBatcher.enqueueEvent(GENERAL_STATE_UI_EVENTS.PURCHASE_COMPLETED);
      this.fireUiEvents();

      return true;
    }

    return false;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._randomSeed = Date.now();
    this._lastUpdateTime = Date.now();
    this._bonusTime = 0;
    this._gameSpeed = GameSpeed.normal;
    this._money = constants.startingSettings.money;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IGeneralSerializedState): Promise<void> {
    this._randomSeed = serializedState.randomSeed;
    this._lastUpdateTime = serializedState.lastUpdateTime;
    this._bonusTime = serializedState.bonusTime;
    this._gameSpeed = serializedState.gameSpeed;
    this._money = serializedState.money;

    this.updateLastUpdateTime();
  }

  serialize(): IGeneralSerializedState {
    return {
      randomSeed: this.randomSeed,
      lastUpdateTime: this.lastUpdateTime,
      bonusTime: this.bonusTime,
      gameSpeed: this.gameSpeed,
      money: this._money,
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
