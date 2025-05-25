import { injectable } from 'inversify';
import { IDistrictMultipliers, IDistrictMultiplierParameter } from '@state/city-state';
import { BaseMultiplierState } from './base-multiplier-state';

@injectable()
export class RewardsState extends BaseMultiplierState {
  getMultiplierParameters() {
    return this.globalState.scenario.currentValues.programMultipliers.rewards;
  }

  getDistrictMultiplierParameter(districtMultipliers: IDistrictMultipliers): IDistrictMultiplierParameter {
    return districtMultipliers.rewards;
  }
}
