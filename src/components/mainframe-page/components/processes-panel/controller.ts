import { BaseController } from '@shared/base-controller';

export class ProcessesPanelController extends BaseController {
  get availableCores(): number {
    return this.mainframeState.processes.availableCores;
  }

  get availableRam(): number {
    return this.mainframeState.processes.availableRam;
  }
}
