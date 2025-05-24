import { Feature } from '@/shared';
import { BaseController } from '@shared/base-controller';

export class ClonesPanelController extends BaseController {
  get availableSynchronization(): number {
    return this.companyState.clones.availableSynchronization;
  }

  get totalSynchronization(): number {
    return this.globalState.synchronization.totalValue;
  }

  get experienceShareMultiplier(): number {
    return this.companyState.clones.experienceShare.totalMultiplier;
  }

  isExperienceShareUnlocked(): boolean {
    return this.globalState.unlockedFeatures.isFeatureUnlocked(Feature.experienceShare);
  }
}
