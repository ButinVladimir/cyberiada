import { BaseController } from '@shared/base-controller';
import { APP_UI_EVENTS } from '@state/app/constants';

export class TopBarValuesController extends BaseController {
  hostConnected() {
    this.app.addUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleUpdatedUI);
  }

  hostDisconnected() {
    this.app.removeUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleUpdatedUI);
  }

  get bonusTime(): number {
    return this.generalState.bonusTime;
  }

  handleUpdatedUI = () => {
    console.log('Request');
    this.host.requestUpdate();
  };
}
