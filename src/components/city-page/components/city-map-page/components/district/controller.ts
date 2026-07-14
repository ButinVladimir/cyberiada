import { BaseController } from '@shared/index';

export class CityMapHighlightedDistrictController extends BaseController {
  get layout() {
    return this.cityState.layout;
  }

  get mapWidth() {
    return this.cityState.width;
  }

  get mapHeight() {
    return this.cityState.height;
  }
}
