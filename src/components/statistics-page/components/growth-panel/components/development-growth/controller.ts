import { BaseController } from '@shared/base-controller';
import { IncomeSource } from '@shared/types';
import { MS_IN_SECOND } from '@shared/constants';

export class StatisticsDevelopmentGrowthController extends BaseController {
  get developmentTotalGrowth() {
    return this.growthState.development.totalGrowth * MS_IN_SECOND;
  }

  getDevelopmentGrowthByIncoumeSource = (incomeSource: IncomeSource) => {
    return this.growthState.development.getGrowth(incomeSource) * MS_IN_SECOND;
  };
}
