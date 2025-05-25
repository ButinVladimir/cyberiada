import { BaseController } from '@shared/base-controller';
import { ISidejob } from '@state/company-state';

export class SidejobsListItemController extends BaseController {
  private _sidejob?: ISidejob;

  getSidejobById(id: string): ISidejob | undefined {
    if (this._sidejob?.id !== id) {
      this._sidejob = this.companyState.sidejobs.getSidejobById(id);
    }

    return this._sidejob;
  }

  cancelSidejobById(id: string) {
    this.companyState.sidejobs.cancelSidejob(id);
  }
}
