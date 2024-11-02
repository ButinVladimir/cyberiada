import { APP_UI_EVENTS } from '@state/app/constants';
import { BaseController } from '@shared/base-controller';

export class TopBarValuesController extends BaseController {
  hostConnected() {
    this.app.addUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.app.removeUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleRefreshUI);
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
}
