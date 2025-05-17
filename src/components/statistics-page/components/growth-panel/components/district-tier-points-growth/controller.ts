import { BaseController } from '@shared/base-controller';
import { IDistrictState } from '@state/city-state';

export class StatisticsDistrictTierPointsGrowthController extends BaseController {
  listAvailableDistricts(): IDistrictState[] {
    return this.cityState.listAvailableDistricts();
  }

  getGrowthByDistrict(districtIndex: number): number {
    return this.growthState.districtTierPoints.getGrowthByDistrict(districtIndex);
  }
}
