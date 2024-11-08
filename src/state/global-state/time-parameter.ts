import { EventBatcher } from '@shared/event-batcher';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { ITimeParameter } from './interfaces/time-parameter';
import { ITimeSerializedParameter } from './interfaces/serialized-states/time-serialized-parameter';
import { ITimeConstructorParameters } from './interfaces/constructor-parameters/time-constructor-parameters';
import { GLOBAL_STATE_UI_EVENTS } from './constants';

export class TimeParameter implements ITimeParameter {
  private _settingsState: ISettingsState;
  private readonly _uiEventBatcher: EventBatcher;

  private _lastUpdateTime: number;
  private _accumulatedTime: number;
  private _gameTime: number;
  private _gameTimeTotal: number;

  constructor(parameters: ITimeConstructorParameters) {
    this._settingsState = parameters.settingsState;

    this._lastUpdateTime = 0;
    this._accumulatedTime = 0;
    this._gameTime = 0;
    this._gameTimeTotal = 0;

    this._uiEventBatcher = new EventBatcher();
  }

  get lastUpdateTime() {
    return this._lastUpdateTime;
  }

  get accumulatedTime() {
    return this._accumulatedTime;
  }

  get gameTime() {
    return this._gameTime;
  }

  get gameTimeTotal() {
    return this._gameTimeTotal;
  }

  updateLastUpdateTime() {
    const updateTime = Date.now();
    this._accumulatedTime += updateTime - this.lastUpdateTime;
    this._lastUpdateTime = updateTime;
  }

  tryNextTick(): boolean {
    if (this._accumulatedTime >= this._settingsState.updateInterval) {
      this._accumulatedTime -= this._settingsState.updateInterval;
      this._gameTime += this._settingsState.updateInterval;
      this._gameTimeTotal += this._settingsState.updateInterval;

      this._uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.ACCUMULATED_TIME_CHANGED);

      return true;
    }

    return false;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._lastUpdateTime = Date.now();
    this._accumulatedTime = 1000000000;
    this._gameTime = 0;
    this._gameTimeTotal = 0;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: ITimeSerializedParameter): Promise<void> {
    this._lastUpdateTime = serializedState.lastUpdateTime;
    this._accumulatedTime = serializedState.accumulatedTime;
    this._gameTime = serializedState.gameTime;
    this._gameTimeTotal = serializedState.gameTimeTotal;

    this.updateLastUpdateTime();
  }

  serialize(): ITimeSerializedParameter {
    return {
      lastUpdateTime: this._lastUpdateTime,
      accumulatedTime: this._accumulatedTime,
      gameTime: this._gameTime,
      gameTimeTotal: this._gameTimeTotal,
    };
  }

  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void): void {
    this._uiEventBatcher.addListener(eventName, handler);
  }

  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void): void {
    this._uiEventBatcher.removeListener(eventName, handler);
  }

  fireUiEvents(): void {
    this._uiEventBatcher.fireEvents();
  }
}
