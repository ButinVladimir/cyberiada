import { BaseController } from '@shared/base-controller';
import { MultipliersType } from '../../types';

export class StatisticsMultipliersController extends BaseController {
  getProgramMultiplier(multiplierType: MultipliersType) {
    return this.getMultiplierState(multiplierType).programMultiplier;
  }

  getTotalMultiplier(multiplierType: MultipliersType) {
    const result = this.getMultiplierState(multiplierType).totalMultiplier;

    return result;
  }

  private getMultiplierState(multiplierType: MultipliersType) {
    switch (multiplierType) {
      case 'mainframeHardwareCostDivisors':
        return this.globalState.multipliers.computationalBase;
      case 'mainframeProgramsCostDivisors':
        return this.globalState.multipliers.codeBase;
      case 'rewards':
        return this.globalState.multipliers.rewards;
    }
  }
}
