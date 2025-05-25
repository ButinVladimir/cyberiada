import { BaseController } from '@shared/base-controller';
import { IDistrictState } from '@state/city-state';

export class StatisticsDistrictTierPointsIncomeController extends BaseController {
  listAvailableDistricts(): IDistrictState[] {
    return this.cityState.listAvailableDistricts();
  }

  getPointsByDistrict(districtIndex: number): number {
    return this.cityState.getDistrictState(districtIndex).parameters.tier.points;
  }
}
