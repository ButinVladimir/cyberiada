import { BaseController } from '@shared/base-controller';
import { MS_IN_SECOND } from '@shared/constants';

export class StatisticsProgramsGrowthController extends BaseController {
  get codeBase() {
    return this.growthState.codeBaseGrowth.growthByProgram * MS_IN_SECOND;
  }
}
