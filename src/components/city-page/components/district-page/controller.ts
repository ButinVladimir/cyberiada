import { BaseController } from '@shared/base-controller';

export class CityDistrictPageController extends BaseController {
  getDistrictState(districtIndex: number) {
    return this.cityState.getDistrictState(districtIndex);
  }
}
