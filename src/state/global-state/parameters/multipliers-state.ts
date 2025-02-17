import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import { IMultipliersSerializedState } from '../interfaces/serialized-states/multipliers-serialized-state';
import type {
  ICodeBaseState,
  IComputationalBaseState,
  IConnectivityState,
  IRewardsState,
} from '../interfaces/parameters/multipliers';
import { IMultipliersState } from '../interfaces/parameters/multipliers-state';

@injectable()
export class MultipliersState implements IMultipliersState {
  private _codeBaseState: ICodeBaseState;
  private _computationalBaseState: IComputationalBaseState;
  private _connectivityState: IConnectivityState;
  private _rewardsState: IRewardsState;

  constructor(
    @inject(TYPES.CodeBaseState) _codeBaseState: ICodeBaseState,
    @inject(TYPES.ComputationalBaseState) _computationalBaseState: IComputationalBaseState,
    @inject(TYPES.ConnectivityState) _connectivityState: IConnectivityState,
    @inject(TYPES.RewardsState) _rewardsState: IRewardsState,
  ) {
    this._codeBaseState = _codeBaseState;
    this._computationalBaseState = _computationalBaseState;
    this._connectivityState = _connectivityState;
    this._rewardsState = _rewardsState;
  }

  get codeBase(): ICodeBaseState {
    return this._codeBaseState;
  }

  get computationalBase(): IComputationalBaseState {
    return this._computationalBaseState;
  }

  get connectivity(): IConnectivityState {
    return this._connectivityState;
  }

  get rewards(): IRewardsState {
    return this._rewardsState;
  }

  recalculate() {
    this._codeBaseState.recalculateCostMultipliers();
    this._computationalBaseState.recalculateCostMultipliers();
    this._connectivityState.recalculateCostMultipliers();
    this._rewardsState.recalculateMultipliers();
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
