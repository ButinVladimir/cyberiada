import { BaseController } from '@shared/base-controller';
import { MAP_STYLES } from '../../constants';
import { IMapStyles } from '../../interfaces';

export class CityMapBackgroundController extends BaseController {
  get layout() {
    return this.cityState.getLayout();
  }

  get mapWidth() {
    return this.globalState.scenario.currentValues.map.width;
  }

  get mapHeight() {
    return this.globalState.scenario.currentValues.map.height;
  }

  getDistrict(districtNum: number) {
    return this.cityState.getDistrictState(districtNum);
  }

  getStyles(): IMapStyles {
    return MAP_STYLES[this.settingsState.theme];
  }
}
