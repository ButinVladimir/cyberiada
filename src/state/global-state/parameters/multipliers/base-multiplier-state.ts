import { injectable } from 'inversify';
import { decorators } from '@state/container';
import type { IGrowthState } from '@state/growth-state/interfaces/growth-state';
import { TYPES } from '@state/types';
import { type ICityState, IDistrictMultipliers } from '@state/city-state';
import { IDistrictMultiplierParameter } from '@state/city-state/interfaces/parameters/district-multiplier-parameter';
import type { IGlobalState } from '../../interfaces/global-state';
import { IMultiplierState } from '../../interfaces/parameters/multiplier-state';
import { IMultiplierSerializedState } from '../../interfaces/serialized-states/multiplier-serialized-state';
import { IMultiplierScenarioParameters } from '../../interfaces/multiplier-scenario-parameters';

const { lazyInject } = decorators;

@injectable()
export abstract class BaseMultiplierState implements IMultiplierState {
  @lazyInject(TYPES.GlobalState)
  protected globalState!: IGlobalState;

  @lazyInject(TYPES.GrowthState)
  protected growthState!: IGrowthState;

  @lazyInject(TYPES.CityState)
  protected cityState!: ICityState;

  private _pointsByProgram: number;
  private _multiplierByProgram: number;
  private _totalMultiplier: number;

  constructor() {
    this._pointsByProgram = 1;
    this._totalMultiplier = 1;
    this._multiplierByProgram = 1;
  }

  get pointsByProgram() {
    return this._pointsByProgram;
  }

  get programMultiplier() {
    return this._multiplierByProgram;
  }

  get totalMultiplier() {
    return this._totalMultiplier;
  }

  increasePointsByProgram(delta: number) {
    this._pointsByProgram += delta;
  }

  async startNewState(): Promise<void> {
    this._pointsByProgram = 0;
    this._multiplierByProgram = 1;
    this._totalMultiplier = 1;
  }

  async deserialize(serializedState: IMultiplierSerializedState): Promise<void> {
    this._pointsByProgram = serializedState.pointsByProgram;
    this._multiplierByProgram = 1;
    this._totalMultiplier = 1;
  }

  serialize(): IMultiplierSerializedState {
    return {
      pointsByProgram: this._pointsByProgram,
    };
  }

  recalculateMultipliers() {
    this.updateMultiplierByProgram();
    this.updateTotalMultiplier();
  }

  private updateMultiplierByProgram() {
    const parameters = this.getMultiplierParameters();

    this._multiplierByProgram =
      1 + Math.log(1 + this._pointsByProgram / parameters.pointsToSoftCap) / Math.log(parameters.logBase);
  }

  private updateTotalMultiplier() {
    this._totalMultiplier = this._multiplierByProgram;

    const availableDistricts = this.cityState.listAvailableDistricts();

    availableDistricts.forEach((districtState) => {
      const districtMultiplierParameter = this.getDistrictMultiplierParameter(districtState.parameters.multipliers);

      districtMultiplierParameter.recalculate();

      this._totalMultiplier *= districtMultiplierParameter.multiplier;
    });
  }

  protected abstract getMultiplierParameters(): IMultiplierScenarioParameters;

  protected abstract getDistrictMultiplierParameter(
    districtMultipliers: IDistrictMultipliers,
  ): IDistrictMultiplierParameter;
}
