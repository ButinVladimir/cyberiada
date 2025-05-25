import { IDistrictState } from '@state/city-state/interfaces/district-state';
import { BaseController } from '@shared/base-controller';
import { IPoint } from '@shared/interfaces/point';

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
    return this.cityState.districtsCount;
  }

  getDistrict(districtIndex: number): IDistrictState {
    return this.cityState.getDistrictState(districtIndex);
  }

  getDistrictStartingPoint(districtIndex: number): IPoint {
    return this.cityState.getDistrictState(districtIndex).startingPoint;
  }
}
