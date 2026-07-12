import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { type IScenarioState } from '@state/scenario-state';
import { IMultiplierSerializedState, IRewardsSnapshotState, IRewardsState } from '../interfaces';

const { lazyInject } = decorators;

@injectable()
export class RewardsState implements IRewardsState {
  @lazyInject(TYPES.ScenarioState)
  private _scenarioState!: IScenarioState;

  private _pointsByProgram: number;
  private _multiplierByProgram: number;

  constructor() {
    this._pointsByProgram = 0;
    this._multiplierByProgram = 1;
  }

  get pointsByProgram() {
    return this._pointsByProgram;
  }

  get multiplierByProgram() {
    return this._multiplierByProgram;
  }

  increasePointsByProgram(delta: number) {
    this._pointsByProgram += delta;
  }

  recalculateMultiplier() {
    const base = this._scenarioState.currentValues.multiplierParameterBases.rewards;

    this._multiplierByProgram = 1 + Math.log(1 + this._pointsByProgram) / Math.log(base);
  }

  async startNewState(): Promise<void> {
    this._pointsByProgram = 0;
  }

  async deserialize(serializedState: IRewardsState): Promise<void> {
    this._pointsByProgram = serializedState.pointsByProgram;
  }

  serialize(): IMultiplierSerializedState {
    return {
      pointsByProgram: this._pointsByProgram,
    };
  }

  makeSnapshot(): IRewardsSnapshotState {
    return {
      multiplierByProgram: this._multiplierByProgram,
      pointsByProgram: this._pointsByProgram,
    };
  }
}
