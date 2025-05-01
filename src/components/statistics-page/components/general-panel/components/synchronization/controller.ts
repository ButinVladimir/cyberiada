import { BaseController } from '@shared/base-controller';
import { IDistrictState } from '@state/city-state';

export class StatisticsSynchronizationController extends BaseController {
  get districtsCount(): number {
    return this.cityState.districtsCount;
  }

  get baseValue(): number {
    return this.globalState.synchronization.baseValue;
  }

  get totalValue(): number {
    return this.globalState.synchronization.totalValue;
  }

  getDistrictState(districtIndex: number): IDistrictState {
    return this.cityState.getDistrictState(districtIndex);
  }

  getDistrictSynchronization(districtIndex: number): number {
    return this.cityState.getDistrictState(districtIndex).parameters.synchronization.value;
  }
}
