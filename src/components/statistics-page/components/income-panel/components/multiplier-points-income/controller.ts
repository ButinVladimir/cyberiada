import { BaseController } from '@shared/base-controller';
import { IDistrictMultipliers, IDistrictState } from '@state/city-state';
import { PointsMultiplierType } from '@shared/types';

export class StatisticsMultiplierPointsIncomeController extends BaseController {
  get districtsCount(): number {
    return this.cityState.districtsCount;
  }

  getDistrictState(districtIndex: number): IDistrictState {
    return this.cityState.getDistrictState(districtIndex);
  }

  getPointsByDistrict(districtIndex: number, multiplierType: PointsMultiplierType): number {
    const districtMultipliers = this.cityState.getDistrictState(districtIndex).parameters.multipliers;

    return this.getDistrictMultiplierParameter(districtMultipliers, multiplierType).points;
  }

  getPointsByProgram(pointsMultiplierType: PointsMultiplierType) {
    return this.getMultiplierState(pointsMultiplierType).pointsByProgram;
  }

  private getMultiplierState(pointsMultiplierType: PointsMultiplierType) {
    switch (pointsMultiplierType) {
      case 'computationalBase':
        return this.globalState.multipliers.computationalBase;
      case 'codeBase':
        return this.globalState.multipliers.codeBase;
      case 'rewards':
        return this.globalState.multipliers.rewards;
    }
  }

  private getDistrictMultiplierParameter(
    districtMultipliers: IDistrictMultipliers,
    pointsMultiplierType: PointsMultiplierType,
  ) {
    switch (pointsMultiplierType) {
      case 'computationalBase':
        return districtMultipliers.computationalBase;
      case 'codeBase':
        return districtMultipliers.codeBase;
      case 'rewards':
        return districtMultipliers.rewards;
    }
  }
}
