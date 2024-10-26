import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';
import { BaseController } from '@shared/base-controller';
import { IncomeSource } from '@shared/types';

export class StatisticsCityDevelopmentIncomeController extends BaseController {
  hostConnected() {
    this.globalState.money.addUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_POINTS_UPDATED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.globalState.money.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_POINTS_UPDATED,
      this.handleRefreshUI,
    );
  }

  getCityDevelopmentIncome = (incomeSource: IncomeSource) => {
    return this.globalState.cityDevelopment.getIncome(incomeSource);
  };

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
