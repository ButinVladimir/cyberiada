import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { type ICityState } from '@state/city-state';
import { type ICompanyState } from '@state/company-state';
import { IDistrictTierPointsGrowthState } from '../interfaces';

const { lazyInject } = decorators;

@injectable()
export class DistrictTierPointsGrowthState implements IDistrictTierPointsGrowthState {
  @lazyInject(TYPES.CityState)
  private _cityState!: ICityState;

  @lazyInject(TYPES.CompanyState)
  private _companyState!: ICompanyState;

  private _recalculated: boolean;
  private _growthByDistrict: Map<number, number>;

  constructor() {
    this._recalculated = false;
    this._growthByDistrict = new Map<number, number>();
  }

  resetValues(): void {
    this._recalculated = false;
  }

  clearValues(): void {
    this._growthByDistrict.clear();
  }

  getGrowthByDistrict(districtIndex: number): number {
    this.recalculate();

    return this._growthByDistrict.get(districtIndex) ?? 0;
  }

  private recalculate() {
    if (this._recalculated) {
      return;
    }

    this._recalculated = true;

    for (let index = 0; index < this._cityState.districtsCount; index++) {
      this._growthByDistrict.set(index, 0);
    }

    this.updateGrowthBySidejobs();
  }

  private updateGrowthBySidejobs(): void {
    for (const sidejob of this._companyState.sidejobs.listSidejobs()) {
      if (!sidejob.isActive) {
        continue;
      }

      let currentGrowth = this._growthByDistrict.get(sidejob.district.index) ?? 0;
      currentGrowth += sidejob.calculateDistrictTierPointsDelta(1);
      this._growthByDistrict.set(sidejob.district.index, currentGrowth);
    }
  }
}
