import { BaseController } from '@/shared';

export class CityDistrictOverviewPanelController extends BaseController {
  getDistrictState(districtIndex: number) {
    return this.cityState.getDistrictState(districtIndex);
  }
}
