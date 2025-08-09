import programs from '@configs/programs.json';
import { calculateLinear, calculateTierLinear } from '@shared/index';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { type ICompanyState } from '@state/company-state';
import { OtherProgramName } from '../types';
import { BaseProgram } from './base-program';

const { lazyInject } = decorators;

export class PeerReviewerProgram extends BaseProgram {
  public readonly name = OtherProgramName.peerReviewer;
  public readonly isAutoscalable = true;

  @lazyInject(TYPES.CompanyState)
  private _companyState!: ICompanyState;

  handlePerformanceUpdate(): void {
    this._companyState.clones.experienceShare.recalculateMultipliers();
  }

  perform(): void {}

  calculateExperienceShareMultiplier(threads: number, usedRam: number): number {
    const programData = programs[this.name];

    return (
      1 +
      calculateTierLinear(this.level, this.tier, programData.cloneExperience.main) *
        calculateLinear(
          this.mainframeState.hardware.performance.totalLevel,
          this.globalState.scenario.currentValues.mainframeSoftware.performanceBoost,
        ) *
        calculateLinear(usedRam, programData.cloneExperience.ram) *
        calculateLinear(threads, programData.cloneExperience.cores)
    );
  }
}
