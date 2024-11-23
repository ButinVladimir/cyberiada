import { BaseController } from '@shared/base-controller';
import { Feature } from '@shared/types';

export class AutomationAutobuyersPanelController extends BaseController {
  isFeatureUnlocked(feature: Feature): boolean {
    return this.globalState.unlockedFeatures.isFeatureUnlocked(feature);
  }
}
