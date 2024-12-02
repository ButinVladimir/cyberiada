import { BaseController } from '@shared/base-controller';
import { PurchaseType } from '@shared/types';

export class StatisticsMoneyExpensesController extends BaseController {
  getMoneyExpenses = (purchaseType: PurchaseType) => {
    return this.globalState.money.getExpenses(purchaseType);
  };
}
