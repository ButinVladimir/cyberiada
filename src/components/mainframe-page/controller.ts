import { Feature } from '@shared/types';
import { BaseController } from '@shared/base-controller';

export class MainframePageController extends BaseController {
  isMainframeHardwareUnlocked(): boolean {
    return this.globalState.unlockedFeatures.isFeatureUnlocked(Feature.mainframeUpgrades);
  }

  isMainframeProgramsUnlocked(): boolean {
    return this.globalState.unlockedFeatures.isFeatureUnlocked(Feature.mainframeUpgrades);
  }
}
