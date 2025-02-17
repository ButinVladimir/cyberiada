import { BaseController } from '@shared/base-controller';

export class MenuBarValuesController extends BaseController {
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
    return this.growthState.developmentGrowth.totalGrowth;
  }

  get developmentPointsUntilNextLevel(): number {
    const development = this.globalState.development;
    return development.getNextLevelPoints(development.level) - this.globalState.development.points;
  }
}
