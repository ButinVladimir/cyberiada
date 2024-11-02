import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';
import { BaseController } from '@shared/base-controller';
import { IncomeSource } from '@shared/types';

export class StatisticsCityDevelopmentIncomeController extends BaseController {
  hostConnected() {
    this.globalState.cityDevelopment.addUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_POINTS_CHANGED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.globalState.cityDevelopment.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_POINTS_CHANGED,
      this.handleRefreshUI,
    );
  }

  getCityDevelopmentIncome = (incomeSource: IncomeSource) => {
    return this.globalState.cityDevelopment.getIncome(incomeSource);
  };
}
