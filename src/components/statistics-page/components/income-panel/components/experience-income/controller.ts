import { BaseController } from '@shared/base-controller';
import { IClone } from '@state/company-state';

export class StatisticsExperienceIncomeController extends BaseController {
  listClones(): IClone[] {
    return this.companyState.clones.listClones();
  }

  getExperienceByClone(cloneId: string): number {
    return this.companyState.clones.getCloneById(cloneId)?.experience ?? 0;
  }
}
