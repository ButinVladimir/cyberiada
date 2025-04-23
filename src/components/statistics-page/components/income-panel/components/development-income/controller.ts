import { BaseController } from '@shared/base-controller';
import { IncomeSource } from '@shared/types';

export class StatisticsDevelopmentIncomeController extends BaseController {
  getDevelopmentIncome = (incomeSource: IncomeSource) => {
    return this.globalState.development.getIncome(incomeSource);
  };
}
