import { BaseController } from '@shared/base-controller';
import { IncomeSource } from '@shared/types';
import { MS_IN_SECOND } from '@shared/constants';

export class StatisticsMoneyGrowthController extends BaseController {
  get moneyTotalGrowth() {
    return this.globalState.moneyGrowth.totalGrowth * MS_IN_SECOND;
  }

  getMoneyGrowth = (incomeSource: IncomeSource) => {
    return this.globalState.moneyGrowth.getGrowth(incomeSource) * MS_IN_SECOND;
  };
}
