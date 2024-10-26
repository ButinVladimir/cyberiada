import { BaseController } from '@shared/base-controller';
import { PurchaseType } from '@shared/types';
import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';

export class StatisticsMoneyExpensesController extends BaseController {
  hostConnected() {
    this.globalState.money.addUiEventListener(GLOBAL_STATE_UI_EVENTS.MONEY_SPENT, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.globalState.money.removeUiEventListener(GLOBAL_STATE_UI_EVENTS.MONEY_SPENT, this.handleRefreshUI);
  }

  getMoneyExpenses = (purchaseType: PurchaseType) => {
    return this.globalState.money.getExpenses(purchaseType);
  };

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
