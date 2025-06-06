import { BaseController } from '@shared/base-controller';
import { Feature } from '@shared/types';

export class OverviewUnlockedItemsPanelController extends BaseController {
  areProgramsUnlocked() {
    return this.globalState.unlockedFeatures.isFeatureUnlocked(Feature.mainframePrograms);
  }

  areCloneTemplatesUnlocked() {
    return this.globalState.unlockedFeatures.isFeatureUnlocked(Feature.companyManagement);
  }
}
