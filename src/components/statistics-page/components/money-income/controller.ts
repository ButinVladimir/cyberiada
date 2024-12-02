import { BaseController } from '@shared/base-controller';
import { IncomeSource } from '@shared/types';

export class StatisticsMoneyIncomeController extends BaseController {
  getMoneyIncome = (incomeSource: IncomeSource) => {
    return this.globalState.money.getIncome(incomeSource);
  };
}
