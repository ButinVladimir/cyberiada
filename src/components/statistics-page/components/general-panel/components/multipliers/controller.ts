import { BaseController } from '@shared/base-controller';
import { CostDivisorsType } from '../../types';

export class StatisticsMultipliersController extends BaseController {
  getMultiplierByProgram(multiplierType: CostDivisorsType) {
    return this.getMultiplierState(multiplierType).multiplierByProgram;
  }

  getTotalMultiplier(multiplierType: CostDivisorsType) {
    const result = this.getMultiplierState(multiplierType).totalMultiplier;

    return result;
  }

  private getMultiplierState(multiplierType: CostDivisorsType) {
    switch (multiplierType) {
      case 'mainframeHardwareCostDivisors':
        return this.globalState.multipliers.computationalBase;
      case 'mainframeProgramsCostDivisors':
        return this.globalState.multipliers.codeBase;
    }
  }
}
