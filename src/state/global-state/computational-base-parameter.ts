import { EventBatcher } from '@shared/event-batcher';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IComputationalBaseParameter } from './interfaces/computational-base-parameter';
import { IComputationalBaseConstructorParameters } from './interfaces/constructor-parameters/computational-base-constructor-parameters';
import { IComputationalBaseSerializedParameter } from './interfaces/serialized-states/computational-base-serialized-parameter';
import { GLOBAL_STATE_UI_EVENTS } from './constants';

export class ComputationalBaseParameter implements IComputationalBaseParameter {
  private _scenarioState: IScenarioState;
  private readonly _uiEventBatcher: EventBatcher;

  private _pointsByProgram: number;
  private _discount: number;
  private _discountUpdateRequested: boolean;

  constructor(parameters: IComputationalBaseConstructorParameters) {
    this._scenarioState = parameters.scenarioState;

    this._pointsByProgram = 1;
    this._discount = 0;
    this._discountUpdateRequested = false;

    this._uiEventBatcher = new EventBatcher();
  }

  get pointsByProgram() {
    return this._pointsByProgram;
  }

  get discount() {
    return this._discount;
  }

  increaseByProgram(delta: number) {
    this._pointsByProgram += delta;

    this.requestDiscountRecalculation();

    this._uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.POINTS_BY_PROGRAM_CHANGED);
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

    this._uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.MAINFRAME_DISCOUNT_CHANGED);
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
