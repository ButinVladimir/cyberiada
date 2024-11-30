import { EventBatcher } from '@shared/event-batcher';
import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { ITimeParameter } from './interfaces/time-parameter';
import { ITimeSerializedParameter } from './interfaces/serialized-states/time-serialized-parameter';
import { ITimeConstructorParameters } from './interfaces/constructor-parameters/time-constructor-parameters';
import { GLOBAL_STATE_UI_EVENTS } from './constants';

export class TimeParameter implements ITimeParameter {
  readonly uiEventBatcher: EventBatcher;

  private _stateUiConnector: IStateUIConnector;
  private _settingsState: ISettingsState;
  private _scenarioState: IScenarioState;

  private _lastUpdateTime: number;
  private _accumulatedTime: number;
  private _gameTime: number;
  private _gameTimeTotal: number;

  constructor(parameters: ITimeConstructorParameters) {
    this._stateUiConnector = parameters.stateUiConnector;
    this._settingsState = parameters.settingsState;
    this._scenarioState = parameters.scenarioState;

    this._lastUpdateTime = 0;
    this._accumulatedTime = 0;
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

  get gameTime() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.ACCUMULATED_TIME_CHANGED);

    return this._gameTime;
  }

  get gameTimeTotal() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.ACCUMULATED_TIME_CHANGED);

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

      this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.ACCUMULATED_TIME_CHANGED);

      return true;
    }

    return false;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._lastUpdateTime = Date.now();
    this._accumulatedTime = this._scenarioState.currentValues.accumulatedTime;
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
}
