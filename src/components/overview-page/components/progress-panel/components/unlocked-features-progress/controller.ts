import { BaseController } from '@shared/base-controller';

export class OverviewUnlockedFeaturesProgressController extends BaseController {
  getUnlockedFeaturesCount() {
    return this.globalState.unlockedFeatures.listUnlockedFeatures().length;
  }
}
