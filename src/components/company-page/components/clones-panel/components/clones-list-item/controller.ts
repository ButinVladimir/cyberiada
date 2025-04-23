import { IClone } from '@state/company-state/states/clone-factory/interfaces/clone';
import { BaseController } from '@shared/base-controller';

export class ClonesListItemController extends BaseController {
  private _clone?: IClone;

  getCloneById(id: string): IClone | undefined {
    if (this._clone?.id !== id) {
      if (this._clone) {
        this.removeEventListenersByEmitter(this._clone);
      }

      this._clone = this.companyState.clones.getCloneById(id);
    }

    return this._clone;
  }

  getCloneSynchronization(clone: IClone): number {
    return this.companyState.clones.getCloneSynchronization(clone.templateName, clone.quality);
  }

  deleteCloneById(id: string) {
    this.companyState.clones.deleteClone(id);
  }
}
