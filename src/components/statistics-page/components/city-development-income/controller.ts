import { BaseController } from '@shared/base-controller';
import { IncomeSource } from '@shared/types';

export class StatisticsCityDevelopmentIncomeController extends BaseController {
  getCityDevelopmentIncome = (incomeSource: IncomeSource) => {
    return this.globalState.cityDevelopment.getIncome(incomeSource);
  };
}
