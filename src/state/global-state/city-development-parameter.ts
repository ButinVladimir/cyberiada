import { GameStateEvent, IncomeSource } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { ICityDevelopmentParameter } from './interfaces/city-development-parameter';
import { ICityDevelopmentSerializedParameter } from './interfaces/serialized-states/city-development-serialized-parameter';
import { ICityDevelopmentConstructorParameters } from './interfaces/constructor-parameters/city-development-constructor-parameters';
import { GLOBAL_STATE_UI_EVENTS } from './constants';

export class CityDevelopmentParameter implements ICityDevelopmentParameter {
  readonly uiEventBatcher: EventBatcher;

  private _stateUiConnector: IStateUIConnector;
  private _scenarioState: IScenarioState;
  private _messageLogState: IMessageLogState;

  private _points: number;
  private _level: number;
  private _levelUpdateRequested: boolean;
  private _income: Map<IncomeSource, number>;

  constructor(parameters: ICityDevelopmentConstructorParameters) {
    this._stateUiConnector = parameters.stateUiConnector;
    this._scenarioState = parameters.scenarioState;
    this._messageLogState = parameters.messageLogState;

    this._points = 0;
    this._level = 1;
    this._levelUpdateRequested = false;
    this._income = new Map<IncomeSource, number>();

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get points() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_POINTS_CHANGED);

    return this._points;
  }

  get level() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_LEVEL_CHANGED);

    return this._level;
  }

  increase(pointsDelta: number, incomeSource: IncomeSource): void {
    this._points += pointsDelta;
    const prevIncome = this.getIncome(incomeSource);
    this._income.set(incomeSource, prevIncome + pointsDelta);

    this.requestLevelRecalculation();

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_POINTS_CHANGED);
  }

  getIncome(incomeSource: IncomeSource): number {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_POINTS_CHANGED);

    return this._income.get(incomeSource) ?? 0;
  }

  getNextLevelPoints(): number {
    const { base, baseMultiplier } = this._scenarioState.currentValues.cityLevelRequirements;

    return (baseMultiplier * (Math.pow(base, this._level) - 1)) / (base - 1);
  }

  requestLevelRecalculation() {
    this._levelUpdateRequested = true;
  }

  recalculateLevel() {
    if (!this._levelUpdateRequested) {
      return;
    }

    this._levelUpdateRequested = false;

    const { base, baseMultiplier } = this._scenarioState.currentValues.cityLevelRequirements;
    const newLevel = Math.floor(Math.log(1 + (this._points * (base - 1)) / baseMultiplier) / Math.log(base)) + 1;

    if (newLevel > this._level) {
      this._level = newLevel;

      this._messageLogState.postMessage(GameStateEvent.levelReached, { level: newLevel });
      this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_LEVEL_CHANGED);
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._points = 0;
    this._level = this._scenarioState.currentValues.startingCityLevel;
    this._income.clear();

    this.requestLevelRecalculation();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: ICityDevelopmentSerializedParameter): Promise<void> {
    this._points = serializedState.points;
    this._level = this._scenarioState.currentValues.startingCityLevel;

    this._income.clear();
    Object.entries(serializedState.income).forEach(([incomeSource, value]) => {
      this._income.set(incomeSource as IncomeSource, value);
    });

    this.requestLevelRecalculation();
  }

  serialize(): ICityDevelopmentSerializedParameter {
    return {
      points: this._points,
      income: Object.fromEntries(this._income.entries()) as Record<IncomeSource, number>,
    };
  }
}
