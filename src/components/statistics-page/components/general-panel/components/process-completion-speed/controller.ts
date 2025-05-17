import { BaseController } from '@shared/base-controller';

export class StatisticsProcessCompletionSpeedController extends BaseController {
  get multiplierByHardware() {
    return this.mainframeState.processes.processCompletionSpeed.multiplierByHardware;
  }

  get multiplierByProgram() {
    return this.mainframeState.processes.processCompletionSpeed.multiplierByProgram;
  }

  get totalMultiplier() {
    return this.mainframeState.processes.processCompletionSpeed.totalMultiplier;
  }
}
