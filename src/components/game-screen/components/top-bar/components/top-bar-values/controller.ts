import { BaseController } from '@shared/base-controller';

export class TopBarValuesController extends BaseController {
  get accumulatedTime(): number {
    return this.globalState.time.accumulatedTime;
  }

  get money(): number {
    return this.globalState.money.money;
  }

  get developmentLevel(): number {
    return this.globalState.development.level;
  }

  get developmentGrowth(): number {
    return this.globalState.developmentGrowth.totalGrowth;
  }

  get developmentPointsUntilNextLevel(): number {
    return this.globalState.development.getNextLevelPoints() - this.globalState.development.points;
  }
}
