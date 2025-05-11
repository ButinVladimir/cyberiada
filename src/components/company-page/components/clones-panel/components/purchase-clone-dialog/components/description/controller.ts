import { BaseController } from '@shared/base-controller';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';

export class PurchaseCloneDialogDescriptionTextController extends BaseController {
  get availableSynchronization(): number {
    return this.companyState.clones.availableSynchronization;
  }

  getCloneSynchronization(cloneTemplateName: CloneTemplateName, quality: number): number {
    return this.companyState.clones.getCloneSynchronization(cloneTemplateName, quality);
  }

  get money(): number {
    return this.globalState.money.money;
  }

  getCloneCost(cloneTemplateName: CloneTemplateName, quality: number, level: number): number {
    return this.companyState.clones.getCloneCost(cloneTemplateName, quality, level);
  }
}
