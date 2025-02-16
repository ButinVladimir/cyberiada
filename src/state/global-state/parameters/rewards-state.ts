import { injectable } from 'inversify';
import { decorators } from '@state/container';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { EventBatcher } from '@shared/event-batcher';
import { TYPES } from '@state/types';
import type { IGlobalState } from '../interfaces/global-state';
import { IRewardsState } from '../interfaces/parameters/rewards-state';
import { IRewardsSerializedState } from '../interfaces/serialized-states/rewards-serialized-state';
import { GLOBAL_STATE_UI_EVENTS } from '../constants';

const { lazyInject } = decorators;

@injectable()
export class RewardsState implements IRewardsState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  private _pointsByProgram: number;
  private _multiplierByProgram: number;
  private _totalMultiplier: number;
  private _costMultiplierUpdateRequested: boolean;

  constructor() {
    this._pointsByProgram = 0;
    this._totalMultiplier = 1;
    this._multiplierByProgram = 1;
    this._costMultiplierUpdateRequested = false;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get pointsByProgram() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.POINTS_BY_PROGRAM_CHANGED);

    return this._pointsByProgram;
  }

  get multiplierByProgram() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.CODE_BASE_COST_MULTIPLIER_CHANGED);

    return this._multiplierByProgram;
  }

  get totalMultiplier() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.CODE_BASE_COST_MULTIPLIER_CHANGED);

    return this._totalMultiplier;
  }

  increasePointsByProgram(delta: number) {
    this._pointsByProgram += delta;

    this.requestMultipliersRecalculation();

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.POINTS_BY_PROGRAM_CHANGED);
  }

  requestMultipliersRecalculation() {
    this._costMultiplierUpdateRequested = true;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._pointsByProgram = 0;
    this._multiplierByProgram = 1;
    this._totalMultiplier = 1;

    this.requestMultipliersRecalculation();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IRewardsSerializedState): Promise<void> {
    this._pointsByProgram = serializedState.pointsByProgram;
    this._multiplierByProgram = 1;
    this._totalMultiplier = 1;

    this.requestMultipliersRecalculation();
  }

  serialize(): IRewardsSerializedState {
    return {
      pointsByProgram: this._pointsByProgram,
    };
  }

  recalculateMultipliers() {
    if (!this._costMultiplierUpdateRequested) {
      return;
    }

    this._costMultiplierUpdateRequested = false;

    this.updateMultiplierByProgram();
    this.updateTotalMultiplier();

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.CODE_BASE_COST_MULTIPLIER_CHANGED);
  }

  private updateMultiplierByProgram() {
    const multipliers = this._globalState.scenario.currentValues.programMultipliers.rewards;

    const pointsLog =
      Math.log(1 + multipliers.completionsToMax * this._pointsByProgram) / Math.log(multipliers.logBase);

    this._multiplierByProgram = 1 + pointsLog;
  }

  private updateTotalMultiplier() {
    this._totalMultiplier = this._multiplierByProgram;
  }
}
