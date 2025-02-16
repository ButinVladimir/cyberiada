import { BaseController } from '@shared/base-controller';

export class StatisticsMultipliersController extends BaseController {
  get programCompletionSpeedMultiplier() {
    return this.growthState.programCompletionSpeed.multiplierByProgram;
  }

  get mainframeProgramCostMultiplier() {
    return this.globalState.codeBase.totalCostMultiplier;
  }

  get mainframeHardwareCostMultiplier() {
    return this.globalState.computationalBase.totalCostMultiplier;
  }

  get overallCostMultiplier() {
    return this.globalState.connectivity.totalCostMultiplier;
  }

  get rewardsMultiplier() {
    return this.globalState.rewards.totalMultiplier;
  }
}
