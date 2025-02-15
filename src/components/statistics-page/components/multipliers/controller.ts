import { BaseController } from '@shared/base-controller';

export class StatisticsMultipliersController extends BaseController {
  get programCompletionSpeedMultiplier() {
    return this.growthState.programCompletionSpeed.multiplierByProgram;
  }

  get mainframeMultiplier() {
    return this.globalState.codeBase.totalCostMultiplier;
  }
}
