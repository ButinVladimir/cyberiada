import { injectable } from 'inversify';
import { BaseMultiplierState } from './base-multiplier-state';

@injectable()
export class RewardsState extends BaseMultiplierState {
  updateTotalMultiplier() {
    const newTotalMultiplier = this._multiplierByProgram;

    if (this._totalMultiplier !== newTotalMultiplier) {
      this._totalMultiplier = newTotalMultiplier;
      this.growthState.requestGrowthRecalculation();
    }
  }

  getMultiplierParameters() {
    return this.globalState.scenario.currentValues.programMultipliers.rewards;
  }
}
