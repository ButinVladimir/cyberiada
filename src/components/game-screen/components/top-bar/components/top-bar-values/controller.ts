import { BaseController } from '@shared/base-controller';
import { APP_UI_EVENTS } from '@state/app/constants';

export class TopBarValuesController extends BaseController {
  hostConnected() {
    this.app.addUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleUpdatedUI);
  }

  hostDisconnected() {
    this.app.removeUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleUpdatedUI);
  }

  get offlineTime(): number {
    return this.generalState.offlineTime;
  }

  get money(): number {
    return this.generalState.money;
  }

  get cityLevel(): number {
    return this.generalState.cityLevel;
  }

  get cityDevelopmentPoints(): number {
    return this.generalState.cityDevelopmentPoints;
  }

  handleUpdatedUI = () => {
    this.host.requestUpdate();
  };
}
