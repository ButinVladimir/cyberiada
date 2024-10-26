import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';
import { BaseController } from '@shared/base-controller';

export class StatisticsGeneralPanelController extends BaseController {
  hostConnected() {
    this.globalState.time.addUiEventListener(GLOBAL_STATE_UI_EVENTS.OFFLINE_TIME_CHANGED, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.globalState.time.removeUiEventListener(GLOBAL_STATE_UI_EVENTS.OFFLINE_TIME_CHANGED, this.handleRefreshUI);
  }

  get gameTime() {
    return this.globalState.time.gameTime;
  }

  get gameTimeTotal() {
    return this.globalState.time.gameTimeTotal;
  }

  get programCompletionSpeedMultiplier() {
    return this.growthState.programCompletionSpeedModifier;
  }

  get programDiscount() {
    return this.growthState.programDiscount;
  }

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
