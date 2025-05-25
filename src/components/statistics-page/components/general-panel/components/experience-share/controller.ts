import { BaseController } from '@shared/base-controller';

export class StatisticsExperienceShareController extends BaseController {
  get baseMultiplier() {
    return this.companyState.clones.experienceShare.baseMultiplier;
  }

  get multiplierBySynchronization() {
    return this.companyState.clones.experienceShare.synchronizationMultiplier;
  }

  get multiplierByProgram() {
    return this.companyState.clones.experienceShare.programMultiplier;
  }

  get totalMultiplier() {
    return this.companyState.clones.experienceShare.totalMultiplier;
  }
}
