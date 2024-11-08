import { APP_UI_EVENTS } from '@state/app/constants';
import { BaseController } from '@shared/base-controller';

export class TopBarValuesController extends BaseController {
  hostConnected() {
    this.app.addUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.app.removeUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleRefreshUI);
  }

  get accumulatedTime(): number {
    return this.globalState.time.accumulatedTime;
  }

  get money(): number {
    return this.globalState.money.money;
  }

  get cityLevel(): number {
    return this.globalState.cityDevelopment.level;
  }

  get cityDevelopmentGrowth(): number {
    return this.globalState.cityDevelopmentGrowth.totalGrowth;
  }

  get cityDevelopmentPointsUntilNextLevel(): number {
    return this.globalState.cityDevelopment.getNextLevelPoints() - this.globalState.cityDevelopment.points;
  }
}
