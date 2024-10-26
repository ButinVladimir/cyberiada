import { BaseController } from '@shared/base-controller';
import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';

export class TopBarValuesController extends BaseController {
  hostConnected() {
    this.globalState.money.addUiEventListener(GLOBAL_STATE_UI_EVENTS.MONEY_CHANGED, this.handleRefreshUI);
    this.globalState.time.addUiEventListener(GLOBAL_STATE_UI_EVENTS.OFFLINE_TIME_CHANGED, this.handleRefreshUI);
    this.globalState.cityDevelopment.addUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_LEVEL_UPDATED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.globalState.money.removeUiEventListener(GLOBAL_STATE_UI_EVENTS.MONEY_CHANGED, this.handleRefreshUI);
    this.globalState.time.removeUiEventListener(GLOBAL_STATE_UI_EVENTS.OFFLINE_TIME_CHANGED, this.handleRefreshUI);
    this.globalState.cityDevelopment.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_LEVEL_UPDATED,
      this.handleRefreshUI,
    );
  }

  get offlineTime(): number {
    return this.globalState.time.offlineTime;
  }

  get money(): number {
    return this.globalState.money.money;
  }

  get cityLevel(): number {
    return this.globalState.cityDevelopment.level;
  }

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
