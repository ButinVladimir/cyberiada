import { BaseController } from '@shared/base-controller';
import { MS_IN_SECOND } from '@shared/constants';
import { PointsMultiplierType } from '@shared/types';

export class StatisticsMultiplierPointsGrowthController extends BaseController {
  getGrowthByProgram(pointsMultiplierType: PointsMultiplierType) {
    return this.getMultiplierGrowthState(pointsMultiplierType).growthByProgram * MS_IN_SECOND;
  }

  private getMultiplierGrowthState(pointsMultiplierType: PointsMultiplierType) {
    switch (pointsMultiplierType) {
      case 'computationalBase':
        return this.growthState.multipliers.computationalBase;
      case 'codeBase':
        return this.growthState.multipliers.codeBase;
      case 'rewards':
        return this.growthState.multipliers.rewards;
    }
  }
}
