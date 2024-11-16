import { BaseController } from '@shared/base-controller';

export class TopBarValuesController extends BaseController {
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
