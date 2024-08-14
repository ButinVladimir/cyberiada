import { IDistrictInfo } from '@state/city-state/interfaces/district-info';
import { BaseController } from '@shared/base-controller';

export class CityOverviewController extends BaseController {
  get mapCellSize(): number {
    return this.settingsState.mapCellSize;
  }

  getDistrictInfo(district: number): IDistrictInfo {
    return this.cityState.getDistrictInfo(district);
  }

  setMapCellSize(mapCellSize: number) {
    this.settingsState.setMapCellSize(mapCellSize);
    this.host.requestUpdate();
  }
}
