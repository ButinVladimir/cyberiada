import { BaseController } from '@shared/base-controller';
import { APP_UI_EVENTS } from '@state/app/constants';
import { GENERAL_STATE_UI_EVENTS } from '@state/general-state/constants';

export class TopBarValuesController extends BaseController {
  hostConnected() {
    this.app.addUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleUpdatedUI);
    this.generalState.addUiEventListener(GENERAL_STATE_UI_EVENTS.PURCHASE_COMPLETED, this.handleUpdatedUI);
  }

  hostDisconnected() {
    this.app.removeUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleUpdatedUI);
    this.generalState.removeUiEventListener(GENERAL_STATE_UI_EVENTS.PURCHASE_COMPLETED, this.handleUpdatedUI);
  }

  get bonusTime(): number {
    return this.generalState.bonusTime;
  }

  get money(): number {
    return this.generalState.money;
  }

  handleUpdatedUI = () => {
    this.host.requestUpdate();
  };
}
