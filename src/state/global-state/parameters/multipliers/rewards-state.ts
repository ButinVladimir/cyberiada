import { injectable } from 'inversify';
import { decorators } from '@state/container';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IGrowthState } from '@state/growth-state/interfaces/growth-state';
import { EventBatcher } from '@shared/event-batcher';
import { TYPES } from '@state/types';
import type { IGlobalState } from '../../interfaces/global-state';
import { IRewardsState } from '../../interfaces/parameters/rewards-state';
import { IMultiplierSerializedState } from '../../interfaces/serialized-states/multiplier-serialized-state';
import { IMultiplierScenarioParameters } from '../../interfaces/multiplier-scenario-parameters';

const { lazyInject } = decorators;

@injectable()
export class RewardsState implements IRewardsState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  protected globalState!: IGlobalState;

  @lazyInject(TYPES.GrowthState)
  protected growthState!: IGrowthState;

  private _pointsByProgram: number;
  private _multiplierByProgram: number;
  private _multiplierUpdateRequested: boolean;

  constructor() {
    this._pointsByProgram = 0;
    this._multiplierByProgram = 1;
    this._multiplierUpdateRequested = false;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get pointsByProgram() {
    return this._pointsByProgram;
  }

  get multiplierByProgram() {
    return this._multiplierByProgram;
  }

  increasePointsByProgram(delta: number) {
    this._pointsByProgram += delta;

    this.requestMultipliersRecalculation();
  }

  requestMultipliersRecalculation() {
    this._multiplierUpdateRequested = true;

    this.growthState.requestGrowthRecalculation();
  }

  async startNewState(): Promise<void> {
    this._pointsByProgram = 0;
    this._multiplierByProgram = 1;

    this.requestMultipliersRecalculation();
  }

  async deserialize(serializedState: IMultiplierSerializedState): Promise<void> {
    this._pointsByProgram = serializedState.pointsByProgram;
    this._multiplierByProgram = 1;

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
  }

  private updateMultiplierByProgram() {
    const parameters = this.getMultiplierParameters();

    this._multiplierByProgram =
      1 + Math.log(1 + this._pointsByProgram / parameters.pointsToMax) / Math.log(parameters.logBase);
  }

  private getMultiplierParameters(): IMultiplierScenarioParameters {
    return this.globalState.scenario.currentValues.programMultipliers.rewards;
  }
}
