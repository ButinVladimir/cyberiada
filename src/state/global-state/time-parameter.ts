import { EventBatcher } from '@shared/event-batcher';
import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';
import { IFormatter } from '@shared/interfaces/formatter';
import { NotificationType } from '@shared/types';
import { ITimeParameter } from './interfaces/time-parameter';
import { ITimeSerializedParameter } from './interfaces/serialized-states/time-serialized-parameter';
import { ITimeConstructorParameters } from './interfaces/constructor-parameters/time-constructor-parameters';
import { GLOBAL_STATE_UI_EVENTS } from './constants';

export class TimeParameter implements ITimeParameter {
  readonly uiEventBatcher: EventBatcher;

  private _stateUiConnector: IStateUIConnector;
  private _settingsState: ISettingsState;
  private _scenarioState: IScenarioState;
  private _notificationsState: INotificationsState;

  private _lastUpdateTime: number;
  private _accumulatedTime: number;
  private _activeTime: number;
  private _gameTime: number;
  private _gameTimeTotal: number;

  private _formatter: IFormatter;

  constructor(parameters: ITimeConstructorParameters) {
    this._stateUiConnector = parameters.stateUiConnector;
    this._settingsState = parameters.settingsState;
    this._scenarioState = parameters.scenarioState;
    this._notificationsState = parameters.notificationsState;
    this._formatter = parameters.formatter;

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

  recalculate(): void {
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

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._lastUpdateTime = Date.now();
    this._accumulatedTime = this._scenarioState.currentValues.accumulatedTime;
    this._activeTime = 0;
    this._gameTime = 0;
    this._gameTimeTotal = 0;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: ITimeSerializedParameter): Promise<void> {
    this._lastUpdateTime = serializedState.lastUpdateTime;
    this._accumulatedTime = serializedState.accumulatedTime;
    this._gameTime = serializedState.gameTime;
    this._gameTimeTotal = serializedState.gameTimeTotal;

    this.updateAccumulatedTime(true);
  }

  serialize(): ITimeSerializedParameter {
    return {
      lastUpdateTime: this._lastUpdateTime,
      accumulatedTime: this._accumulatedTime,
      gameTime: this._gameTime,
      gameTimeTotal: this._gameTimeTotal,
    };
  }
}
