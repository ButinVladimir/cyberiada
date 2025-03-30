import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import { IMultipliersSerializedState } from '../interfaces/serialized-states/multipliers-serialized-state';
import type { IConnectivityState, IRewardsState, IMultiplierState, IMultipliersState } from '../interfaces/parameters';

@injectable()
export class MultipliersState implements IMultipliersState {
  private _codeBaseState: IMultiplierState;
  private _computationalBaseState: IMultiplierState;
  private _connectivityState: IConnectivityState;
  private _rewardsState: IRewardsState;

  constructor(
    @inject(TYPES.CodeBaseState) _codeBaseState: IMultiplierState,
    @inject(TYPES.ComputationalBaseState) _computationalBaseState: IMultiplierState,
    @inject(TYPES.ConnectivityState) _connectivityState: IConnectivityState,
    @inject(TYPES.RewardsState) _rewardsState: IRewardsState,
  ) {
    this._codeBaseState = _codeBaseState;
    this._computationalBaseState = _computationalBaseState;
    this._connectivityState = _connectivityState;
    this._rewardsState = _rewardsState;
  }

  get codeBase() {
    return this._codeBaseState;
  }

  get computationalBase() {
    return this._computationalBaseState;
  }

  get connectivity() {
    return this._connectivityState;
  }

  get rewards() {
    return this._rewardsState;
  }

  recalculate() {
    this._rewardsState.recalculateMultipliers();
    this._codeBaseState.recalculateMultipliers();
    this._computationalBaseState.recalculateMultipliers();
  }

  async startNewState(): Promise<void> {
    await this._codeBaseState.startNewState();
    await this._computationalBaseState.startNewState();
    await this._connectivityState.startNewState();
    await this._rewardsState.startNewState();

    this.recalculate();
  }

  async deserialize(serializedState: IMultipliersSerializedState): Promise<void> {
    await this._codeBaseState.deserialize(serializedState.codeBase);
    await this._computationalBaseState.deserialize(serializedState.computationalBase);
    await this._connectivityState.deserialize(serializedState.connectivity);
    await this._rewardsState.deserialize(serializedState.rewards);

    this.recalculate();
  }

  serialize(): IMultipliersSerializedState {
    return {
      codeBase: this._codeBaseState.serialize(),
      computationalBase: this._computationalBaseState.serialize(),
      connectivity: this._connectivityState.serialize(),
      rewards: this._rewardsState.serialize(),
    };
  }
}
