import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { EventBatcher } from '@shared/event-batcher';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from '@state/types';
import { NotificationType } from '@shared/types';
import { ITimeState } from '../interfaces/parameters/time-state';
import { ITimeSerializedState } from '../interfaces/serialized-states/time-serialized-state';
import type { IGlobalState } from '../interfaces/global-state';
import { GLOBAL_STATE_UI_EVENTS } from '../constants';

const { lazyInject } = decorators;

@injectable()
export class TimeState implements ITimeState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.SettingsState)
  private _settingsState!: ISettingsState;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  @lazyInject(TYPES.NotificationsState)
  private _notificationsState!: INotificationsState;

  @lazyInject(TYPES.Formatter)
  private _formatter!: IFormatter;

  private _lastUpdateTime: number;
  private _accumulatedTime: number;
  private _activeTime: number;
  private _gameTime: number;
  private _gameTimeTotal: number;

  constructor() {
    this._lastUpdateTime = 0;
    this._accumulatedTime = 0;
    this._activeTime = 0;
    this._gameTime = 0;
    this._gameTimeTotal = 0;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get lastUpdateTime() {
    return this._lastUpdateTime;
  }

  get accumulatedTime() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.ACCUMULATED_TIME_CHANGED);

    return this._accumulatedTime;
  }

  get activeTime() {
    return this._activeTime;
  }

  get gameTime() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.GAME_TIME_CHANGED);

    return this._gameTime;
  }

  get gameTimeTotal() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.GAME_TIME_CHANGED);

    return this._gameTimeTotal;
  }

  updateAccumulatedTime(showNotification: boolean) {
    const updateTime = Date.now();
    const earnedTime = updateTime - this.lastUpdateTime;
    this._accumulatedTime += earnedTime;
    this._lastUpdateTime = updateTime;

    if (showNotification && earnedTime > 0) {
      this._notificationsState.pushNotification(NotificationType.timeAccumulated, {
        time: this._formatter.formatTimeShort(earnedTime),
      });
    }

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.ACCUMULATED_TIME_CHANGED);
  }

  updateActiveTime() {
    const updateTime = Date.now();
    this._activeTime += updateTime - this.lastUpdateTime;
    this._lastUpdateTime = updateTime;
  }

  checkTimeForNextTick(): boolean {
    if (this._activeTime >= this._settingsState.updateInterval) {
      return true;
    }

    if (this._accumulatedTime >= this._settingsState.updateInterval) {
      return true;
    }

    return false;
  }

  makeNextTick(): void {
    if (this._activeTime >= this._settingsState.updateInterval) {
      this._activeTime -= this._settingsState.updateInterval;
    } else if (this._accumulatedTime >= this._settingsState.updateInterval) {
      this._accumulatedTime -= this._settingsState.updateInterval;
      this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.ACCUMULATED_TIME_CHANGED);
    }

    this._gameTime += this._settingsState.updateInterval;
    this._gameTimeTotal += this._settingsState.updateInterval;

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.GAME_TIME_CHANGED);
  }

  async startNewState(): Promise<void> {
    this._lastUpdateTime = Date.now();
    this._accumulatedTime = this._globalState.scenario.currentValues.accumulatedTime;
    this._activeTime = 0;
    this._gameTime = 0;
    this._gameTimeTotal = 0;
  }

  async deserialize(serializedState: ITimeSerializedState): Promise<void> {
    this._lastUpdateTime = serializedState.lastUpdateTime;
    this._accumulatedTime = serializedState.accumulatedTime;
    this._gameTime = serializedState.gameTime;
    this._gameTimeTotal = serializedState.gameTimeTotal;

    this.updateAccumulatedTime(true);
  }

  serialize(): ITimeSerializedState {
    return {
      lastUpdateTime: this._lastUpdateTime,
      accumulatedTime: this._accumulatedTime,
      gameTime: this._gameTime,
      gameTimeTotal: this._gameTimeTotal,
    };
  }
}
