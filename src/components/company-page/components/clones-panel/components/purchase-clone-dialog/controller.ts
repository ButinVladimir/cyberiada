import { IPurchaseCloneArgs, CloneTemplateName, IClone } from '@state/company-state';
import { BaseController } from '@shared/base-controller';

export class PurchaseCloneDialogController extends BaseController {
  private _clone?: IClone;

  hostDisconnected() {
    super.hostDisconnected();

    this.deleteTemporaryClone();
  }

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

  getClone(name: string, cloneTemplateName: CloneTemplateName, quality: number, level: number): IClone {
    if (
      this._clone?.name !== name ||
      this._clone.templateName !== cloneTemplateName ||
      this._clone.quality !== quality ||
      this._clone.level !== level
    ) {
      this.deleteTemporaryClone();

      this._clone = this.companyState.cloneFactory.makeClone({
        id: 'temporary',
        name,
        templateName: cloneTemplateName,
        quality,
        level,
        experience: 0,
        autoUpgradeEnabled: true,
      });
    }

    return this._clone;
  }

  private deleteTemporaryClone() {
    if (this._clone) {
      this._clone.removeAllEventListeners();
    }
  }
}
