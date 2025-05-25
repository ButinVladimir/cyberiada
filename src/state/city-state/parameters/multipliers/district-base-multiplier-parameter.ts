import { calculatePower } from '@shared/helpers';
import {
  IDistrictMultiplierParameter,
  IDistrictState,
  IDistrictMultiplierSerializedParameter,
  IDistrictTypeMultiplierParameters,
} from '../../interfaces';

export abstract class DistrictBaseMultiplierParameter implements IDistrictMultiplierParameter {
  protected _district: IDistrictState;
  private _points: number;
  private _multiplier: number;

  constructor(district: IDistrictState) {
    this._district = district;
    this._points = 0;
    this._multiplier = 1;
  }

  get points(): number {
    return this._points;
  }

  get multiplier(): number {
    return this._multiplier;
  }

  increasePoints(delta: number): void {
    this._points += delta;
  }

  recalculate(): void {
    const parameters = this.getMultiplierParameters();

    const pointsToSoftCap = calculatePower(this._district.parameters.tier.tier, parameters.pointsToSoftCap);

    this._multiplier = 1 + Math.log(1 + this._points / pointsToSoftCap) / Math.log(parameters.logBase);
  }

  async deserialize(serializedState: IDistrictMultiplierSerializedParameter): Promise<void> {
    this._points = serializedState.points;
    this._multiplier = 1;
  }

  serialize(): IDistrictMultiplierSerializedParameter {
    return {
      points: this._points,
    };
  }

  protected abstract getMultiplierParameters(): IDistrictTypeMultiplierParameters;
}
