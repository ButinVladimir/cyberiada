import { IClone } from '@state/company-state/states/clone-factory/interfaces/clone';
import { BaseController } from '@shared/base-controller';

export class ClonesListItemController extends BaseController {
  private _clone?: IClone;

  getCloneById(id: string): IClone | undefined {
    if (this._clone?.id !== id) {
      this._clone = this.companyState.clones.getCloneById(id);
    }

    return this._clone;
  }

  deleteCloneById(id: string) {
    this.companyState.clones.deleteClone(id);
  }
}
