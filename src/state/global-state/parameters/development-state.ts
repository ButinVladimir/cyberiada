import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { GameStateEvent, IncomeSource } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { TYPES } from '@state/types';
import { calculateGeometricProgressionSum, reverseGeometricProgressionSum } from '@shared/helpers';
import { IDevelopmentState } from '../interfaces/parameters/development-state';
import { IDevelopmentSerializedState } from '../interfaces/serialized-states/development-serialized-state';
import type { IGlobalState } from '../interfaces/global-state';
import { GLOBAL_STATE_UI_EVENTS } from '../constants';

const { lazyInject } = decorators;

@injectable()
export class DevelopmentState implements IDevelopmentState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  @lazyInject(TYPES.MessageLogState)
  private _messageLogState!: IMessageLogState;

  private _points: number;
  private _level: number;
  private _levelUpdateRequested: boolean;
  private _income: Map<IncomeSource, number>;

  constructor() {
    this._points = 0;
    this._level = 1;
    this._income = new Map<IncomeSource, number>();
    this._levelUpdateRequested = false;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get points() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.DEVELOPMENT_POINTS_CHANGED);

    return this._points;
  }

  get level() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.DEVELOPMENT_LEVEL_CHANGED);

    return this._level;
  }

  increase(pointsDelta: number, incomeSource: IncomeSource): void {
    this._points += pointsDelta;
    const prevIncome = this.getIncome(incomeSource);
    this._income.set(incomeSource, prevIncome + pointsDelta);

    this.requestLevelRecalculation();

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.DEVELOPMENT_POINTS_CHANGED);
  }

  getIncome(incomeSource: IncomeSource): number {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.DEVELOPMENT_POINTS_CHANGED);

    return this._income.get(incomeSource) ?? 0;
  }

  getLevelRequirements(level: number): number {
    if (level <= 0) {
      return 0;
    }

    return calculateGeometricProgressionSum(
      this._level,
      this._globalState.scenario.currentValues.developmentLevelRequirements,
    );
  }

  requestLevelRecalculation() {
    this._levelUpdateRequested = true;
  }

  recalculateLevel() {
    if (!this._levelUpdateRequested) {
      return;
    }

    this._levelUpdateRequested = false;

    const prevLevel = this._level;
    const newLevel = reverseGeometricProgressionSum(
      this._points,
      this._globalState.scenario.currentValues.developmentLevelRequirements,
    );

    if (newLevel > prevLevel) {
      this._level = newLevel;

      this._messageLogState.postMessage(GameStateEvent.levelReached, { level: newLevel });
      this._globalState.storyEvents.visitEventsByLevel(prevLevel);
      this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.DEVELOPMENT_LEVEL_CHANGED);
    }
  }

  async startNewState(): Promise<void> {
    this._points = 0;
    this._level = this._globalState.scenario.currentValues.developmentLevel;
    this._income.clear();

    this.requestLevelRecalculation();
  }

  async deserialize(serializedState: IDevelopmentSerializedState): Promise<void> {
    this._points = serializedState.points;
    this._level = serializedState.level;

    this._income.clear();
    Object.entries(serializedState.income).forEach(([incomeSource, value]) => {
      this._income.set(incomeSource as IncomeSource, value);
    });

    this.requestLevelRecalculation();
  }

  serialize(): IDevelopmentSerializedState {
    return {
      points: this._points,
      level: this._level,
      income: Object.fromEntries(this._income.entries()) as Record<IncomeSource, number>,
    };
  }
}
