import { BaseController } from '@shared/base-controller';
import { MultipliersType } from '../../types';

export class StatisticsMultipliersController extends BaseController {
  getMultiplierByProgram(multiplierType: MultipliersType) {
    return this.getMultiplierState(multiplierType).multiplierByProgram;
  }

  getTotalMultiplier(multiplierType: MultipliersType) {
    let result = this.getMultiplierState(multiplierType).totalMultiplier;

    if (this.isMultipliedByOverallMultiplier(multiplierType)) {
      result *= this.globalState.multipliers.connectivity.totalMultiplier;
    }

    return result;
  }

  private getMultiplierState(multiplierType: MultipliersType) {
    switch (multiplierType) {
      case 'mainframeHardwareCostDivisors':
        return this.globalState.multipliers.computationalBase;
      case 'mainframeProgramsCostDivisors':
        return this.globalState.multipliers.codeBase;
      case 'overallCostDivisors':
        return this.globalState.multipliers.connectivity;
      case 'rewards':
        return this.globalState.multipliers.rewards;
    }
  }

  private isMultipliedByOverallMultiplier(multiplierType: MultipliersType) {
    return multiplierType === 'mainframeHardwareCostDivisors' || multiplierType === 'mainframeProgramsCostDivisors';
  }
}
