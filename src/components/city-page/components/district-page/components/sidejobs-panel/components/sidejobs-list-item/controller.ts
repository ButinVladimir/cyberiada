import { ISidejob, SidejobName } from '@state/company-state';
import { BaseController } from '@shared/base-controller';

export class CityDistrictSidejobsListItemController extends BaseController {
  private _sidejob: ISidejob | undefined;

  getSidejob(sidejobName: SidejobName, districtIndex: number): ISidejob | undefined {
    if (this._sidejob?.sidejobName !== sidejobName || this._sidejob.district.index !== districtIndex) {
      if (this._sidejob) {
        this.removeEventListenersByEmitter(this._sidejob);
      }

      this._sidejob = this.companyState.sidejobs.getSidejobByNameAndDistrict(sidejobName, districtIndex);
    }

    return this._sidejob;
  }
}
