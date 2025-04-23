import { BaseController } from '@shared/base-controller';
import { Feature } from '@shared/types';

export class OverviewUnlockedItemsPanelController extends BaseController {
  areProgramsUnlocked() {
    return this.globalState.unlockedFeatures.isFeatureUnlocked(Feature.mainframeUpgrades);
  }

  areCloneTemplatesUnlocked() {
    return this.globalState.unlockedFeatures.isFeatureUnlocked(Feature.companyManagement);
  }
}
