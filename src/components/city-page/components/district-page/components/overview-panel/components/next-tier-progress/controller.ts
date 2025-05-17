import { BaseController } from '@shared/base-controller';

export class CityDistrictOverviewPanelNextTierProgressController extends BaseController {
  getDistrictTierPoints(districtIndex: number): number {
    return this.getDistrictTierParameter(districtIndex).points;
  }

  getCurrentTierRequirements(districtIndex: number): number {
    const tierParameter = this.getDistrictTierParameter(districtIndex);
    return tierParameter.getTierRequirements(tierParameter.tier - 1);
  }

  getNextTierRequirements(districtIndex: number): number {
    const tierParameter = this.getDistrictTierParameter(districtIndex);
    return tierParameter.getTierRequirements(tierParameter.tier);
  }

  getDistrictTierGrowth(districtIndex: number): number {
    return this.growthState.districtTierPoints.getGrowthByDistrict(districtIndex);
  }

  private getDistrictTierParameter(districtIndex: number) {
    return this.cityState.getDistrictState(districtIndex).parameters.tier;
  }
}
