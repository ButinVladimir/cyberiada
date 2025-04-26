import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { IncomeSource } from '@shared/types';
import programs from '@configs/programs.json';
import { calculateQualityLinear } from '@shared/helpers';
import { OtherProgramName } from '../types';
import { IShareServerParameters } from '../interfaces/program-parameters/share-server-parameters';
import { BaseProgram } from './base-program';

export class ShareServerProgram extends BaseProgram {
  public readonly name = OtherProgramName.shareServer;
  public readonly isAutoscalable = true;

  private _settingsState: ISettingsState;

  constructor(parameters: IShareServerParameters) {
    super(parameters);

    this._settingsState = parameters.settingsState;
  }

  handlePerformanceUpdate(): void {
    this.growthState.money.requestGrowthRecalculation();
    this.growthState.development.requestGrowthRecalculation();
  }

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
      calculateQualityLinear(this.level, this.quality, programData.money)
    );
  }

  calculateDevelopmentPointsDelta(threads: number, usedRam: number, passedTime: number): number {
    const programData = programs[this.name];

    return (
      this.globalState.scenario.currentValues.programMultipliers.developmentPoints.pointsMultiplier *
      this.calculateModifier(threads, usedRam, passedTime) *
      calculateQualityLinear(this.level, this.quality, programData.developmentPoints)
    );
  }

  private calculateModifier(threads: number, usedRam: number, passedTime: number): number {
    const programData = programs[this.name];

    return (
      this.globalState.multipliers.rewards.totalMultiplier *
      passedTime *
      Math.pow(threads * usedRam, programData.autoscalableResourcesPower) *
      (1 +
        (this.mainframeState.hardware.performance.level - 1) *
          this.globalState.scenario.currentValues.mainframeSoftware.performanceBoost)
    );
  }
}
