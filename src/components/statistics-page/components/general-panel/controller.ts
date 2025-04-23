import { Feature } from '@shared/types';
import { BaseController } from '@shared/base-controller';

export class StatisticsGeneralPanelController extends BaseController {
  isFeatureUnlocked(feature: Feature) {
    return this.globalState.unlockedFeatures.isFeatureUnlocked(feature);
  }
}
