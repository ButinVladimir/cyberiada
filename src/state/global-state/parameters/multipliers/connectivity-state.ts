import { injectable } from 'inversify';
import { BaseMultiplierState } from './base-multiplier-state';

@injectable()
export class ConnectivityState extends BaseMultiplierState {
  getMultiplierParameters() {
    return this.globalState.scenario.currentValues.programMultipliers.connectivity;
  }
}
