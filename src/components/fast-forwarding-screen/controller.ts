import { APP_UI_EVENTS } from '@state/app';
import { BaseController } from '@shared/base-controller';

export class FastForwardingScreenController extends BaseController {
  hostConnected() {
    this.app.addUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.app.removeUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleRefreshUI);
  }

  get accumulatedTime(): number {
    return this.globalState.time.accumulatedTime;
  }

  stopFastForwarding() {
    this.app.stopFastForwarding();
  }
}
