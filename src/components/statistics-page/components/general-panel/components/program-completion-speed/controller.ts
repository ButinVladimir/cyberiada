import { BaseController } from '@shared/base-controller';

export class StatisticsProgramCompletionSpeedController extends BaseController {
  get multiplierByHardware() {
    return this.growthState.programCompletionSpeed.multiplierByHardware;
  }

  get multiplierByProgram() {
    return this.growthState.programCompletionSpeed.multiplierByProgram;
  }

  get totalMultiplier() {
    return this.growthState.programCompletionSpeed.totalMultiplier;
  }
}
