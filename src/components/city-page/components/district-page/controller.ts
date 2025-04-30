import { BaseController } from '@/shared';

export class CityDistrictPageController extends BaseController {
  getDistrictState(districtIndex: number) {
    return this.cityState.getDistrictState(districtIndex);
  }
}
