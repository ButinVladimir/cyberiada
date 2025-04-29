import { BaseController } from '@/shared';

export class CityMapTooltipContentController extends BaseController {
  getDistrictInfo(districtIndex: number) {
    return this.cityState.getDistrictInfo(districtIndex);
  }
}
