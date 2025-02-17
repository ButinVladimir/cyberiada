import { BaseController } from '@shared/base-controller';

export class StatisticsMultipliersController extends BaseController {
  get programCompletionSpeedMultiplier() {
    return this.growthState.programCompletionSpeed.multiplierByProgram;
  }

  get mainframeProgramCostMultiplier() {
    return this.globalState.multipliers.codeBase.totalCostMultiplier;
  }

  get mainframeHardwareCostMultiplier() {
    return this.globalState.multipliers.computationalBase.totalCostMultiplier;
  }

  get overallCostMultiplier() {
    return this.globalState.multipliers.connectivity.totalCostMultiplier;
  }

  get rewardsMultiplier() {
    return this.globalState.multipliers.rewards.totalMultiplier;
  }
}
