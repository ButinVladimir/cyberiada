import { BaseController } from '@shared/base-controller';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';

export class PurchaseCloneDialogController extends BaseController {
  get developmentLevel(): number {
    return this.globalState.development.level;
  }

  getHighestAvailableQuality(cloneTemplateName: CloneTemplateName): number {
    return this.globalState.availableItems.cloneTemplates.getItemHighestAvailableQuality(cloneTemplateName);
  }

  listAvailableCloneTemplates(): CloneTemplateName[] {
    return this.globalState.availableItems.cloneTemplates.listAvailableItems();
  }

  purchaseClone(name: string, templateName: CloneTemplateName, quality: number, level: number): boolean {
    return this.companyState.clones.purchaseClone(name, templateName, quality, level);
  }
}
