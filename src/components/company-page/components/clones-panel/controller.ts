import { BaseController } from '@shared/base-controller';

export class ClonesPanelController extends BaseController {
  get availableSynchronization(): number {
    return this.companyState.clones.availableSynchronization;
  }

  get totalSynchronization(): number {
    return this.companyState.clones.totalSynchronization;
  }
}
