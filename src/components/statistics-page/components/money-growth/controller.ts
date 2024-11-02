import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';
import { BaseController } from '@shared/base-controller';
import { IncomeSource } from '@shared/types';
import { MS_IN_SECOND } from '@shared/constants';

export class StatisticsMoneyGrowthController extends BaseController {
  hostConnected() {
    this.globalState.money.addUiEventListener(GLOBAL_STATE_UI_EVENTS.MONEY_GROWTH_CHANGED, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.globalState.money.removeUiEventListener(GLOBAL_STATE_UI_EVENTS.MONEY_GROWTH_CHANGED, this.handleRefreshUI);
  }

  get moneyTotalGrowth() {
    return this.globalState.moneyGrowth.totalGrowth * MS_IN_SECOND;
  }

  getMoneyGrowth = (incomeSource: IncomeSource) => {
    return this.globalState.moneyGrowth.getGrowth(incomeSource) * MS_IN_SECOND;
  };
}
