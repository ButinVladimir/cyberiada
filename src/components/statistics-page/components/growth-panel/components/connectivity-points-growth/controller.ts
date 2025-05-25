import { IDistrictState } from '@state/city-state';
import { BaseController, MS_IN_SECOND } from '@shared/index';

export class StatisticsConnectivityPointsGrowthController extends BaseController {
  listAvailableDistricts(): IDistrictState[] {
    return this.cityState.listAvailableDistricts();
  }

  getGrowthByProgram() {
    return this.growthState.connectivity.growthByProgram * MS_IN_SECOND;
  }

  getGrowthByDistrict(districtIndex: number) {
    return this.growthState.connectivity.getBaseGrowthByDistrict(districtIndex) * MS_IN_SECOND;
  }
}
