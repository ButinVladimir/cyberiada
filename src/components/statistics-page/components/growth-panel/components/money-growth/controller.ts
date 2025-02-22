import { BaseController } from '@shared/base-controller';
import { IncomeSource } from '@shared/types';
import { MS_IN_SECOND } from '@shared/constants';

export class StatisticsMoneyGrowthController extends BaseController {
  get moneyTotalGrowth() {
    return this.growthState.money.totalGrowth * MS_IN_SECOND;
  }

  getMoneyGrowthByIncomeSource = (incomeSource: IncomeSource) => {
    return this.growthState.money.getGrowth(incomeSource) * MS_IN_SECOND;
  };
}
