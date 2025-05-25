import programs from '@configs/programs.json';
import { type ISettingsState } from '@state/settings-state';
import { IncomeSource } from '@shared/types';
import { calculateTierLinear } from '@shared/helpers';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { OtherProgramName } from '../types';
import { BaseProgram } from './base-program';

const { lazyInject } = decorators;

export class ShareServerProgram extends BaseProgram {
  public readonly name = OtherProgramName.shareServer;
  public readonly isAutoscalable = true;

  @lazyInject(TYPES.SettingsState)
  private _settingsState!: ISettingsState;

  handlePerformanceUpdate(): void {}

  perform(threads: number, usedRam: number): void {
    const moneyDelta = this.calculateMoneyDelta(threads, usedRam, this._settingsState.updateInterval);
    const developmentPointsDelta = this.calculateDevelopmentPointsDelta(
      threads,
      usedRam,
      this._settingsState.updateInterval,
    );

    this.globalState.money.increase(moneyDelta, IncomeSource.program);
    this.globalState.development.increase(developmentPointsDelta, IncomeSource.program);
  }

  calculateMoneyDelta(threads: number, usedRam: number, passedTime: number): number {
    const programData = programs[this.name];

    return (
      this.globalState.scenario.currentValues.programMultipliers.money.pointsMultiplier *
      this.calculateModifier(threads, usedRam, passedTime) *
      calculateTierLinear(this.level, this.tier, programData.money)
    );
  }

  calculateDevelopmentPointsDelta(threads: number, usedRam: number, passedTime: number): number {
    const programData = programs[this.name];

    return (
      this.globalState.scenario.currentValues.programMultipliers.developmentPoints.pointsMultiplier *
      this.calculateModifier(threads, usedRam, passedTime) *
      calculateTierLinear(this.level, this.tier, programData.developmentPoints)
    );
  }

  private calculateModifier(threads: number, usedRam: number, passedTime: number): number {
    const programData = programs[this.name];

    return (
      this.globalState.multipliers.rewards.totalMultiplier *
      passedTime *
      Math.pow(threads * usedRam, programData.autoscalableResourcesPower) *
      Math.pow(
        this.globalState.scenario.currentValues.mainframeSoftware.performanceBoost,
        this.mainframeState.hardware.performance.totalLevel,
      )
    );
  }
}
