import { BaseController } from '@shared/base-controller';
import { IClone } from '@state/company-state';

export class StatisticsExperienceGrowthController extends BaseController {
  listClones(): IClone[] {
    return this.companyState.clones.listClones();
  }

  getGrowthByClone(cloneId: string): number {
    return this.growthState.experience.getGrowthByClone(cloneId);
  }
}
