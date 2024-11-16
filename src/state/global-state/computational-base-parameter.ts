import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { EventBatcher } from '@shared/event-batcher';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IComputationalBaseParameter } from './interfaces/computational-base-parameter';
import { IComputationalBaseConstructorParameters } from './interfaces/constructor-parameters/computational-base-constructor-parameters';
import { IComputationalBaseSerializedParameter } from './interfaces/serialized-states/computational-base-serialized-parameter';
import { GLOBAL_STATE_UI_EVENTS } from './constants';

export class ComputationalBaseParameter implements IComputationalBaseParameter {
  readonly uiEventBatcher: EventBatcher;

  private _stateUiConnector: IStateUIConnector;
  private _scenarioState: IScenarioState;

  private _pointsByProgram: number;
  private _discount: number;
  private _discountUpdateRequested: boolean;

  constructor(parameters: IComputationalBaseConstructorParameters) {
    this._stateUiConnector = parameters.stateUiConnector;
    this._scenarioState = parameters.scenarioState;

    this._pointsByProgram = 1;
    this._discount = 0;
    this._discountUpdateRequested = false;

    this.uiEventBatcher = new EventBatcher();
  }

  get pointsByProgram() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.POINTS_BY_PROGRAM_CHANGED);

    return this._pointsByProgram;
  }

  get discount() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.MAINFRAME_DISCOUNT_CHANGED);

    return this._discount;
  }

  increaseByProgram(delta: number) {
    this._pointsByProgram += delta;

    this.requestDiscountRecalculation();

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.POINTS_BY_PROGRAM_CHANGED);
  }

  requestDiscountRecalculation() {
    this._discountUpdateRequested = true;
  }

  recalculateDiscount() {
    if (!this._discountUpdateRequested) {
      return;
    }

    this._discountUpdateRequested = false;

    let logSum = 1;
    logSum += Math.log(this._pointsByProgram) / Math.log(this._scenarioState.currentValues.discounts.program);

    this._discount = 1 - 1 / logSum;

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.MAINFRAME_DISCOUNT_CHANGED);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._pointsByProgram = 1;
    this._discount = 0;

    this.requestDiscountRecalculation();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IComputationalBaseSerializedParameter): Promise<void> {
    this._pointsByProgram = serializedState.pointsByProgram;

    this.requestDiscountRecalculation();
  }

  serialize(): IComputationalBaseSerializedParameter {
    return {
      pointsByProgram: this._pointsByProgram,
    };
  }
}
