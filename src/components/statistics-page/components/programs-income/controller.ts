import { BaseController } from '@shared/base-controller';

export class StatisticsProgramsIncomeController extends BaseController {
  get computationalBase() {
    return this.globalState.computationalBase.pointsByProgram;
  }
}
