import { BaseController } from '@shared/base-controller';

export class StatisticsMultipliersController extends BaseController {
  get programCompletionSpeedMultiplier() {
    return this.globalState.programCompletionSpeed.multiplier;
  }

  get mainframeDiscount() {
    return this.globalState.computationalBase.discount;
  }
}
