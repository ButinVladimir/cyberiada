import { GLOBAL_STATE_UI_EVENTS } from '@/state/global-state/constants';
import { BaseController } from '@shared/base-controller';

export class PurchaseTooltipController extends BaseController {
  hostConnected() {
    this.globalState.money.addUiEventListener(GLOBAL_STATE_UI_EVENTS.MONEY_CHANGED, this.handleRefreshUI);
    this.globalState.moneyGrowth.addUiEventListener(GLOBAL_STATE_UI_EVENTS.MONEY_GROWTH_CHANGED, this.handleRefreshUI);
    this.globalState.cityDevelopment.addUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_LEVEL_CHANGED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.globalState.money.removeUiEventListener(GLOBAL_STATE_UI_EVENTS.MONEY_CHANGED, this.handleRefreshUI);
    this.globalState.moneyGrowth.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.MONEY_GROWTH_CHANGED,
      this.handleRefreshUI,
    );
    this.globalState.cityDevelopment.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_LEVEL_CHANGED,
      this.handleRefreshUI,
    );
  }

  get money() {
    return this.globalState.money.money;
  }

  get growth() {
    return this.globalState.moneyGrowth.totalGrowth;
  }

  get cityDevelopmentLevel() {
    return this.globalState.cityDevelopment.level;
  }
}
