import { BaseController } from '@shared/base-controller';

export class CityDistrictOverviewPanelController extends BaseController {
  getDistrictState(districtIndex: number) {
    return this.cityState.getDistrictState(districtIndex);
  }
}
