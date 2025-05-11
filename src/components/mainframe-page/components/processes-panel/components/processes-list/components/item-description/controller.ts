import { BaseController } from '@shared/base-controller';

export class ProcessDescriptionTextController extends BaseController {
  get autoscalableProcessRam(): number {
    return this.mainframeState.processes.availableRam + 1;
  }
}
