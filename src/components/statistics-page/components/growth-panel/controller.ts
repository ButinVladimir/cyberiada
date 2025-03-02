import { Feature } from '@shared/types';
import { BaseController } from '@shared/base-controller';

export class StatisticsGrowthPanelController extends BaseController {
  isFeatureUnlocked(feature: Feature) {
    return this.globalState.unlockedFeatures.isFeatureUnlocked(feature);
  }
}
