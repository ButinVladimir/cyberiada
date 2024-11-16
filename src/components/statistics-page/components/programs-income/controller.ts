import { BaseController } from '@shared/base-controller';

export class StatisticsProgramsIncomeController extends BaseController {
  get computationalBaseByProgram() {
    return this.globalState.computationalBase.pointsByProgram;
  }
}
