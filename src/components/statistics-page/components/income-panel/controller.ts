import { Feature } from '@shared/types';
import { BaseController } from '@shared/base-controller';

export class StatisticsIncomePanelController extends BaseController {
  isFeatureUnlocked(feature: Feature) {
    return this.globalState.unlockedFeatures.isFeatureUnlocked(feature);
  }
}
