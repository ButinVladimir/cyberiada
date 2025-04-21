import { BaseController } from '@shared/base-controller';
import { IClone } from '@state/company-state/states/clone-factory/interfaces/clone';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';

export class CloneDialogDescriptionTextController extends BaseController {
  private _clone?: IClone;

  hostDisconnected() {
    super.hostDisconnected();

    this.deleteTemporaryClone();
  }

  get availableSynchronization(): number {
    return this.companyState.clones.availableSynchronization;
  }

  getCloneSynchronization(cloneTemplateName: CloneTemplateName, quality: number): number {
    return this.companyState.clones.getCloneSynchronization(cloneTemplateName, quality);
  }

  getClone(cloneTemplateName: CloneTemplateName, quality: number, level: number): IClone {
    if (
      this._clone?.templateName !== cloneTemplateName ||
      this._clone.quality !== quality ||
      this._clone.level !== level
    ) {
      this.deleteTemporaryClone();

      this._clone = this.companyState.cloneFactory.makeClone({
        id: 'temporary',
        name: 'temporary',
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
