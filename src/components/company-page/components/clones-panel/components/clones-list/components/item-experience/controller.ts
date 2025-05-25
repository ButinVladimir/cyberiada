import { BaseController } from '@/shared';

export class ClonesListItemExperienceController extends BaseController {
  getCloneExperienceGrowth(cloneId: string): number {
    return this.growthState.experience.getGrowthByClone(cloneId);
  }
}
