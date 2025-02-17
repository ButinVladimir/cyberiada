import { BaseController } from '@shared/base-controller';

export class StatisticsProgramsIncomeController extends BaseController {
  get codeBase() {
    return this.globalState.multipliers.codeBase.pointsByProgram;
  }

  get computationalBase() {
    return this.globalState.multipliers.computationalBase.pointsByProgram;
  }

  get connectivity() {
    return this.globalState.multipliers.connectivity.pointsByProgram;
  }

  get rewards() {
    return this.globalState.multipliers.rewards.pointsByProgram;
  }
}
