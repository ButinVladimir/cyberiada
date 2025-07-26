import { IClone } from '@state/company-state/states/clone-factory/interfaces/clone';
import { BaseController } from '@shared/base-controller';

export class RenameCloneDialogController extends BaseController {
  private _clone?: IClone;

  getCloneById(id: string): IClone | undefined {
    if (this._clone?.id !== id) {
      this._clone = this.companyState.clones.getCloneById(id);
    }

    return this._clone;
  }

  renameCloneById(id: string, newName: string) {
    const clone = this.companyState.clones.getCloneById(id);

    if (clone) {
      clone.name = newName;
    }
  }

  generateName(): string {
    return this.companyState.clones.generateCloneName();
  }
}
