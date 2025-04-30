import { BaseController } from '@/shared';

export class CityMapTooltipContentController extends BaseController {
  getDistrictState(districtIndex: number) {
    return this.cityState.getDistrictState(districtIndex);
  }
}
