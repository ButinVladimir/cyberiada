import { Feature } from '@shared/types';
import { BaseController } from '@shared/base-controller';

export class StatisticsUnlockedFeaturesPanelController extends BaseController {
  listUnlockedFeatures(): Feature[] {
    return this.globalState.unlockedFeatures.listUnlockedFeatures();
  }
}
