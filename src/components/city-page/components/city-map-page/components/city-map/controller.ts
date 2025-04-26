import { BaseController } from '@/shared';

export class CityMapController extends BaseController {
  get layout() {
    return this.cityState.getLayout();
  }

  get mapWidth() {
    return this.globalState.scenario.currentValues.map.width;
  }

  get mapHeight() {
    return this.globalState.scenario.currentValues.map.height;
  }

  get districtsCount() {
    return this.globalState.scenario.currentValues.map.districts.length;
  }
}
