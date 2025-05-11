import { injectable } from 'inversify';
import { IDistrictMultipliers, IDistrictMultiplierParameter } from '@state/city-state';
import { BaseMultiplierState } from './base-multiplier-state';

@injectable()
export class ComputationalBaseState extends BaseMultiplierState {
  getMultiplierParameters() {
    return this.globalState.scenario.currentValues.programMultipliers.computationalBase;
  }

  getDistrictMultiplierParameter(districtMultipliers: IDistrictMultipliers): IDistrictMultiplierParameter {
    return districtMultipliers.computationalBase;
  }
}
