import districtTypes from '@configs/district-types.json';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import { calculatePower } from '@shared/helpers';
import {
  IDistrictConnectivityParameter,
  IDistrictState,
  IDistrictConnectivitySerializedParameter,
} from '../interfaces';

const { lazyInject } = decorators;

export class DistrictConnectivityParameter implements IDistrictConnectivityParameter {
  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  private _district: IDistrictState;
  private _points: number;
  private _totalValue: number;

  constructor(district: IDistrictState) {
    this._district = district;
    this._points = 0;
    this._totalValue = 0;
  }

  get points(): number {
    return this._points;
  }

  get totalValue(): number {
    return this._totalValue;
  }

  increasePoints(delta: number): void {
    this._points += delta;
  }

  recalculate(): void {
    const districtTypeData = districtTypes[this._district.districtType];

    const pointsByProgram = calculatePower(
      this._district.parameters.tier.tier,
      districtTypeData.parameters.connectivity.programPointsMultiplier,
    );
    this._totalValue = this._points + this._globalState.connectivity.pointsByProgram * pointsByProgram;
  }

  async deserialize(serializedState: IDistrictConnectivitySerializedParameter): Promise<void> {
    this._points = serializedState.points;
    this._totalValue = this._points;
  }

  serialize(): IDistrictConnectivitySerializedParameter {
    return {
      points: this._points,
    };
  }
}
