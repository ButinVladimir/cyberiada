import { BaseController, Feature } from '@shared/index';

export class CityDistrictOverviewPanelController extends BaseController {
  isDistrictTiersUnlocked(): boolean {
    return this.globalState.unlockedFeatures.isFeatureUnlocked(Feature.districtTiers);
  }
}
