import { injectable } from 'inversify';
import { decorators } from '@state/container';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { EventBatcher } from '@shared/event-batcher';
import { TYPES } from '@state/types';
import type { IGlobalState } from '../../interfaces/global-state';
import { IMultiplierState } from '../../interfaces/parameters/multiplier-state';
import { IMultiplierSerializedState } from '../../interfaces/serialized-states/multiplier-serialized-state';
import { GLOBAL_STATE_UI_EVENTS } from '../../constants';
import { IMultiplierScenarioParameters } from '../../interfaces/multiplier-scenario-parameters';

const { lazyInject } = decorators;

@injectable()
export abstract class BaseMultiplierState implements IMultiplierState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  protected globalState!: IGlobalState;

  private _pointsByProgram: number;
  private _multiplierByProgram: number;
  private _totalMultiplier: number;
  private _multiplierUpdateRequested: boolean;

  constructor() {
    this._pointsByProgram = 0;
    this._totalMultiplier = 1;
    this._multiplierByProgram = 1;
    this._multiplierUpdateRequested = false;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get pointsByProgram() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.POINTS_BY_PROGRAM_CHANGED);

    return this._pointsByProgram;
  }

  get multiplierByProgram() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.MULTIPLIER_CHANGED);

    return this._multiplierByProgram;
  }

  get totalMultiplier() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.MULTIPLIER_CHANGED);

    return this._totalMultiplier;
  }

  increasePointsByProgram(delta: number) {
    this._pointsByProgram += delta;

    this.requestMultipliersRecalculation();

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.POINTS_BY_PROGRAM_CHANGED);
  }

  requestMultipliersRecalculation() {
    this._multiplierUpdateRequested = true;
  }

  async startNewState(): Promise<void> {
    this._pointsByProgram = 0;
    this._multiplierByProgram = 1;
    this._totalMultiplier = 1;

    this.requestMultipliersRecalculation();
  }

  async deserialize(serializedState: IMultiplierSerializedState): Promise<void> {
    this._pointsByProgram = serializedState.pointsByProgram;
    this._multiplierByProgram = 1;
    this._totalMultiplier = 1;

    this.requestMultipliersRecalculation();
  }

  serialize(): IMultiplierSerializedState {
    return {
      pointsByProgram: this._pointsByProgram,
    };
  }

  recalculateMultipliers() {
    if (!this._multiplierUpdateRequested) {
      return;
    }

    this._multiplierUpdateRequested = false;

    this.updateMultiplierByProgram();
    this.updateTotalMultiplier();

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.MULTIPLIER_CHANGED);
  }

  private updateMultiplierByProgram() {
    const parameters = this.getMultiplierParameters();

    this._multiplierByProgram =
      1 + Math.log(1 + this._pointsByProgram / parameters.pointsToMax) / Math.log(parameters.logBase);
  }

  private updateTotalMultiplier() {
    this._totalMultiplier = this._multiplierByProgram;
  }

  protected abstract getMultiplierParameters(): IMultiplierScenarioParameters;
}
