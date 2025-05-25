import programs from '@configs/programs.json';
import { calculateTierLinear } from '@shared/helpers';
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
      Math.pow(threads * usedRam, programData.autoscalableResourcesPower) *
        calculateTierLinear(this.level, this.tier, programData.experienceModifier) *
        Math.pow(
          this.globalState.scenario.currentValues.mainframeSoftware.performanceBoost,
          this.mainframeState.hardware.performance.totalLevel,
        )
    );
  }
}
