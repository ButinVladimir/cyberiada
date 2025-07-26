import { BaseController } from '@shared/base-controller';

export class CityMapHighlightedDistrictController extends BaseController {
  get layout() {
    return this.cityState.getLayout();
  }

  get mapWidth() {
    return this.globalState.scenario.currentValues.map.width;
  }

  get mapHeight() {
    return this.globalState.scenario.currentValues.map.height;
  }

  get theme() {
    return this.settingsState.theme;
  }
}
