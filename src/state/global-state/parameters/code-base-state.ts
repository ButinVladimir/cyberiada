import { injectable } from 'inversify';
import { decorators } from '@state/container';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { EventBatcher } from '@shared/event-batcher';
import { TYPES } from '@state/types';
import type { IGlobalState } from '../interfaces/global-state';
import { ICodeBaseState } from '../interfaces/parameters/code-base-state';
import { ICodeBaseSerializedState } from '../interfaces/serialized-states/code-base-serialized-state';
import { GLOBAL_STATE_UI_EVENTS } from '../constants';

const { lazyInject } = decorators;

@injectable()
export class CodeBaseState implements ICodeBaseState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  private _pointsByProgram: number;
  private _costMultiplierByProgram: number;
  private _totalCostMultiplier: number;
  private _costMultiplierUpdateRequested: boolean;

  constructor() {
    this._pointsByProgram = 0;
    this._totalCostMultiplier = 1;
    this._costMultiplierByProgram = 1;
    this._costMultiplierUpdateRequested = false;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get pointsByProgram() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.POINTS_BY_PROGRAM_CHANGED);

    return this._pointsByProgram;
  }

  get costMultiplierByProgram() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.POINTS_BY_PROGRAM_CHANGED);

    return this._costMultiplierByProgram;
  }

  get totalCostMultiplier() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.CODE_BASE_COST_MULTIPLIER_CHANGED);

    return this._totalCostMultiplier;
  }

  increasePointsByProgram(delta: number) {
    this._pointsByProgram += delta;

    this.requestCostMultipliersRecalculation();

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.POINTS_BY_PROGRAM_CHANGED);
  }

  requestCostMultipliersRecalculation() {
    this._costMultiplierUpdateRequested = true;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._pointsByProgram = 0;
    this._costMultiplierByProgram = 1;
    this._totalCostMultiplier = 1;

    this.requestCostMultipliersRecalculation();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: ICodeBaseSerializedState): Promise<void> {
    this._pointsByProgram = serializedState.pointsByProgram;
    this._costMultiplierByProgram = 1;
    this._totalCostMultiplier = 1;

    this.requestCostMultipliersRecalculation();
  }

  serialize(): ICodeBaseSerializedState {
    return {
      pointsByProgram: this._pointsByProgram,
    };
  }

  recalculateCostMultipliers() {
    if (!this._costMultiplierUpdateRequested) {
      return;
    }

    this._costMultiplierUpdateRequested = false;

    this.updateMultiplierByProgram();
    this.updateTotalMultiplier();

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.CODE_BASE_COST_MULTIPLIER_CHANGED);
  }

  private updateMultiplierByProgram() {
    const pointsLog =
      Math.log(1 + this._pointsByProgram) / Math.log(this._globalState.scenario.currentValues.multipliers.program);

    this._costMultiplierByProgram = 1 / (1 + pointsLog);
  }

  private updateTotalMultiplier() {
    this._totalCostMultiplier = this._costMultiplierByProgram;
  }
}
