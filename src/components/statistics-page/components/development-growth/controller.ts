import { BaseController } from '@shared/base-controller';
import { IncomeSource } from '@shared/types';
import { MS_IN_SECOND } from '@shared/constants';

export class StatisticsDevelopmentGrowthController extends BaseController {
  get developmentTotalGrowth() {
    return this.growthState.developmentGrowth.totalGrowth * MS_IN_SECOND;
  }

  getDevelopmentGrowth = (incomeSource: IncomeSource) => {
    return this.growthState.developmentGrowth.getGrowth(incomeSource) * MS_IN_SECOND;
  };
}
