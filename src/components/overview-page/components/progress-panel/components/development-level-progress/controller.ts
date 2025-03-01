import { BaseController } from '@shared/base-controller';

export class OverviewDevelopmentLevelProgressController extends BaseController {
  getCurrentDevelopmentLevelPoints() {
    const development = this.globalState.development;

    const currentPoints = development.points;
    const prevLevelPoints = development.getLevelPoints(development.level - 1);

    return currentPoints - prevLevelPoints;
  }

  getNextDevelopmentLevelPoints() {
    const development = this.globalState.development;

    const nextLevelPoints = development.getLevelPoints(development.level);
    const prevLevelPoints = development.getLevelPoints(development.level - 1);

    return nextLevelPoints - prevLevelPoints;
  }

  getDevelopmentGrowth(): number {
    return this.growthState.development.totalGrowth;
  }

  getDevelopmentPointsUntilNextLevel(): number {
    const development = this.globalState.development;

    return development.getLevelPoints(development.level) - development.points;
  }
}
