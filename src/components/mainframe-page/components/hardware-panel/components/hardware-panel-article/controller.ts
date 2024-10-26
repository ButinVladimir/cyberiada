import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';
import { BaseController } from '@shared/base-controller';

export class MainframeHardwarePanelArticleController extends BaseController {
  hostConnected() {
    this.globalState.money.addUiEventListener(GLOBAL_STATE_UI_EVENTS.MONEY_CHANGED, this.handleRefreshUI);
    this.globalState.cityDevelopment.addUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_LEVEL_UPDATED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.globalState.money.removeUiEventListener(GLOBAL_STATE_UI_EVENTS.MONEY_CHANGED, this.handleRefreshUI);
    this.globalState.cityDevelopment.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_LEVEL_UPDATED,
      this.handleRefreshUI,
    );
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
