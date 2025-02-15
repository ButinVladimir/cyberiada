import { BaseController } from '@shared/base-controller';
import { MS_IN_SECOND } from '@shared/constants';

export class StatisticsProgramCompletionSpeedController extends BaseController {
  get programCompletionSpeed() {
    return this.growthState.programCompletionSpeed.totalMultiplier * MS_IN_SECOND;
  }
}
