import { BaseController } from '@shared/base-controller';

export class CityDistrictOverviewPanelValuesController extends BaseController {
  getDistrictState(districtIndex: number) {
    return this.cityState.getDistrictState(districtIndex);
  }
}
