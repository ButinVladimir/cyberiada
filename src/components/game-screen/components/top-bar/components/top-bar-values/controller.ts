import { BaseController } from '@shared/base-controller';
import { GENERAL_STATE_UI_EVENTS } from '@state/general-state/constants';

export class TopBarValuesController extends BaseController {
  hostConnected() {
    this.generalState.addUiEventListener(GENERAL_STATE_UI_EVENTS.BONUS_TIME_CHANGED, this.handleUpdatedUI);
    this.generalState.addUiEventListener(GENERAL_STATE_UI_EVENTS.MONEY_CHANGED, this.handleUpdatedUI);
  }

  hostDisconnected() {
    this.generalState.removeUiEventListener(GENERAL_STATE_UI_EVENTS.BONUS_TIME_CHANGED, this.handleUpdatedUI);
    this.generalState.removeUiEventListener(GENERAL_STATE_UI_EVENTS.MONEY_CHANGED, this.handleUpdatedUI);
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
