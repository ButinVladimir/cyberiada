import { BaseController } from '@shared/base-controller';
import { MS_IN_SECOND } from '@shared/constants';

export class StatisticsProgramsGrowthController extends BaseController {
  get computationalBase() {
    return this.globalState.programsGrowth.computationalBase * MS_IN_SECOND;
  }
}
