import { BaseController } from '@shared/base-controller';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';

export class PurchaseCloneDialogController extends BaseController {
  get money(): number {
    return this.globalState.money.money;
  }

  get moneyGrowth(): number {
    return this.growthState.money.totalGrowth;
  }

  get availableSynchronization(): number {
    return this.companyState.clones.availableSynchronization;
  }

  getCloneCost(cloneTemplateName: CloneTemplateName, quality: number, level: number): number {
    return this.companyState.clones.getCloneCost(cloneTemplateName, quality, level);
  }

  getCloneSynchronization(cloneTemplateName: CloneTemplateName, quality: number): number {
    return this.companyState.clones.getCloneSynchronization(cloneTemplateName, quality);
  }

  isCloneAvailable(cloneTemplate: CloneTemplateName, quality: number, level: number): boolean {
    return this.globalState.availableItems.cloneTemplates.isItemAvailable(cloneTemplate, quality, level);
  }
}
