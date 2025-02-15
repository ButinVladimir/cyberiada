import { BaseController } from '@shared/base-controller';

export class StatisticsProgramsIncomeController extends BaseController {
  get codeBase() {
    return this.globalState.codeBase.pointsByProgram;
  }
}
