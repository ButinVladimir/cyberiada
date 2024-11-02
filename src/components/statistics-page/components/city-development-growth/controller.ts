import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';
import { BaseController } from '@shared/base-controller';
import { IncomeSource } from '@shared/types';
import { MS_IN_SECOND } from '@shared/constants';

export class StatisticsCityDevelopmentGrowthController extends BaseController {
  hostConnected() {
    this.globalState.money.addUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_GROWTH_CHANGED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.globalState.money.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_GROWTH_CHANGED,
      this.handleRefreshUI,
    );
  }

  get cityDevelopmentTotalGrowth() {
    return this.globalState.cityDevelopmentGrowth.totalGrowth * MS_IN_SECOND;
  }

  getCityDevelopmentGrowth = (incomeSource: IncomeSource) => {
    return this.globalState.cityDevelopmentGrowth.getGrowth(incomeSource) * MS_IN_SECOND;
  };
}
