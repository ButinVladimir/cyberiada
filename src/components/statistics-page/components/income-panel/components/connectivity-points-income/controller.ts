import { BaseController } from '@shared/base-controller';
import { IDistrictState } from '@state/city-state';

export class StatisticsConnectivityPointsIncomeController extends BaseController {
  get districtsCount(): number {
    return this.cityState.districtsCount;
  }

  getDistrictState(districtIndex: number): IDistrictState {
    return this.cityState.getDistrictState(districtIndex);
  }

  getPointsByDistrict(districtIndex: number): number {
    return this.cityState.getDistrictState(districtIndex).parameters.connectivity.points;
  }

  getPointsByProgram() {
    return this.globalState.connectivity.pointsByProgram;
  }
}
