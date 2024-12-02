import { BaseController } from '@shared/base-controller';

export class ProcessesPanelController extends BaseController {
  get availableCores(): number {
    return this.mainframeProcessesState.availableCores;
  }

  get availableRam(): number {
    return this.mainframeProcessesState.availableRam;
  }
}
