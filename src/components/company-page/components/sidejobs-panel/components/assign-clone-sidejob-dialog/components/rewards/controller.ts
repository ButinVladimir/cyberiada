import { BaseController } from '@shared/base-controller';
import { Feature } from '@shared/index';

export class AssignCloneSidejobDialogRewardsController extends BaseController {
  isFeatureUnlocked(feature: Feature) {
    return this.globalState.unlockedFeatures.isFeatureUnlocked(feature);
  }
}
