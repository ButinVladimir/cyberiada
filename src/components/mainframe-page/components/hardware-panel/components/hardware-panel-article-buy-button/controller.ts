import { GENERAL_STATE_UI_EVENTS } from '@state/general-state/constants';
import { BaseController } from '@shared/base-controller';

export class MainframeHardwarePanelArticleBuyButtonController extends BaseController {
  hostConnected() {
    this.generalState.addUiEventListener(GENERAL_STATE_UI_EVENTS.MONEY_CHANGED, this.handleRefreshUI);
    this.generalState.addUiEventListener(GENERAL_STATE_UI_EVENTS.CITY_LEVEL_CHANGED, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.generalState.removeUiEventListener(GENERAL_STATE_UI_EVENTS.MONEY_CHANGED, this.handleRefreshUI);
    this.generalState.removeUiEventListener(GENERAL_STATE_UI_EVENTS.CITY_LEVEL_CHANGED, this.handleRefreshUI);
  }

  get money(): number {
    return this.generalState.money;
  }

  get cityLevel(): number {
    return this.generalState.cityLevel;
  }

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
