import { injectable } from 'inversify';
import { BaseMultiplierState } from './base-multiplier-state';

@injectable()
export class ComputationalBaseState extends BaseMultiplierState {
  getMultiplierParameters() {
    return this.globalState.scenario.currentValues.programMultipliers.computationalBase;
  }
}
