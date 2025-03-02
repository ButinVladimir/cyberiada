import { BaseController } from '@shared/base-controller';
import { PointsMultiplierType } from '@shared/types';

export class StatisticsMultiplierPointsIncomeController extends BaseController {
  getPointsByProgram(pointsMultiplierType: PointsMultiplierType) {
    return this.getMultiplierState(pointsMultiplierType).pointsByProgram;
  }

  private getMultiplierState(pointsMultiplierType: PointsMultiplierType) {
    switch (pointsMultiplierType) {
      case 'computationalBase':
        return this.globalState.multipliers.computationalBase;
      case 'codeBase':
        return this.globalState.multipliers.codeBase;
      case 'connectivity':
        return this.globalState.multipliers.connectivity;
      case 'rewards':
        return this.globalState.multipliers.rewards;
    }
  }
}
