import { BaseController } from '@shared/base-controller';

export class StatisticsProgramsIncomeController extends BaseController {
  get codeBase() {
    return this.globalState.codeBase.pointsByProgram;
  }

  get computationalBase() {
    return this.globalState.computationalBase.pointsByProgram;
  }

  get connectivity() {
    return this.globalState.connectivity.pointsByProgram;
  }

  get rewards() {
    return this.globalState.rewards.pointsByProgram;
  }
}
