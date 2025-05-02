import { IPurchaseCloneArgs, CloneTemplateName } from '@/state/company-state';
import { BaseController } from '@shared/base-controller';

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

  purchaseClone(args: IPurchaseCloneArgs): boolean {
    return this.companyState.clones.purchaseClone(args);
  }

  generateName(): Promise<string> {
    return this.companyState.clones.generateCloneName();
  }
}
