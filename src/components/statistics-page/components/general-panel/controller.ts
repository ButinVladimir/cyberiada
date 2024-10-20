import { BaseController } from '@shared/base-controller';
import { GENERAL_STATE_UI_EVENTS } from '@state/general-state/constants';

export class StatisticsGeneralPanelController extends BaseController {
  hostConnected() {
    this.generalState.addUiEventListener(GENERAL_STATE_UI_EVENTS.VALUES_CHANGED, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.generalState.removeUiEventListener(GENERAL_STATE_UI_EVENTS.VALUES_CHANGED, this.handleRefreshUI);
  }

  get timeThisRun() {
    return this.generalState.timeThisRun;
  }

  get timeTotal() {
    return this.generalState.timeTotal;
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
