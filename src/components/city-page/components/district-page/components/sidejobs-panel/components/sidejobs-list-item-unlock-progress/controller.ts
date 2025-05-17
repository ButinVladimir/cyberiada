import { SidejobName } from '@state/company-state';
import { BaseController } from '@shared/base-controller';

export class CityDistrictSidejobsListItemUnlockProgressController extends BaseController {
  getCurrentConnectivity(districtIndex: number) {
    return this.cityState.getDistrictState(districtIndex).parameters.connectivity.totalValue;
  }

  getRequiredConnectivity(sidejobName: SidejobName) {
    return this.companyState.sidejobs.getConnectivityRequirement(sidejobName);
  }

  getConnectivityGrowth(districtIndex: number) {
    return this.growthState.connectivity.getTotalGrowthByDistrict(districtIndex);
  }
}
