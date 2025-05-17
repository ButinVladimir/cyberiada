import { BaseController } from '@shared/base-controller';

export class CityMapDistrictDescriptionController extends BaseController {
  getDistrictState(districtIndex: number) {
    return this.cityState.getDistrictState(districtIndex);
  }
}
