import { BaseController } from '@shared/base-controller';
import { IncomeSource } from '@shared/types';
import { MS_IN_SECOND } from '@shared/constants';

export class StatisticsCityDevelopmentGrowthController extends BaseController {
  get cityDevelopmentTotalGrowth() {
    return this.globalState.cityDevelopmentGrowth.totalGrowth * MS_IN_SECOND;
  }

  getCityDevelopmentGrowth = (incomeSource: IncomeSource) => {
    return this.globalState.cityDevelopmentGrowth.getGrowth(incomeSource) * MS_IN_SECOND;
  };
}
