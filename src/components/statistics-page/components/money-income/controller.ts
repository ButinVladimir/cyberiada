import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';
import { BaseController } from '@shared/base-controller';
import { IncomeSource } from '@shared/types';

export class StatisticsMoneyIncomeController extends BaseController {
  hostConnected() {
    this.globalState.money.addUiEventListener(GLOBAL_STATE_UI_EVENTS.MONEY_INCREASED, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.globalState.money.removeUiEventListener(GLOBAL_STATE_UI_EVENTS.MONEY_INCREASED, this.handleRefreshUI);
  }

  getMoneyIncome = (incomeSource: IncomeSource) => {
    return this.globalState.money.getIncome(incomeSource);
  };

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
