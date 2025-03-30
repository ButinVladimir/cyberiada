import { BaseController } from '@shared/base-controller';

export class StatisticsRewardsController extends BaseController {
  getMultiplierByProgram() {
    return this.globalState.multipliers.rewards.multiplierByProgram;
  }
}
