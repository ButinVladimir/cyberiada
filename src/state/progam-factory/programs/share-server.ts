import { MS_IN_SECOND } from '@shared/constants';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { IExponent } from '@shared/interfaces/exponent';
import { calculatePow } from '@shared/helpers';
import { IncomeSource } from '@shared/types';
import programs from '@configs/programs.json';
import { ProgramName } from '../types';
import { IShareServerParameters } from '../interfaces/program-parameters/share-server-parameters';
import { BaseProgram } from './base-program';

export class ShareServerProgram extends BaseProgram {
  public readonly name = ProgramName.shareServer;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = true;

  private _settingsState: ISettingsState;

  constructor(parameters: IShareServerParameters) {
    super(parameters);

    this._settingsState = parameters.settingsState;
  }

  perform(threads: number, usedRam: number): void {
    const moneyDelta = this.calculateMoneyDelta(threads, usedRam, this._settingsState.updateInterval);
    const cityDevelopmentPointsDelta = this.calculateCityDevelopmentPointsDelta(
      threads,
      usedRam,
      this._settingsState.updateInterval,
    );

    this.globalState.money.increase(moneyDelta, IncomeSource.program);
    this.globalState.cityDevelopment.increase(cityDevelopmentPointsDelta, IncomeSource.program);
  }

  buildProgramDescriptionParametersObject(threads: number, usedRam: number) {
    const moneyDelta = this.calculateMoneyDelta(threads, usedRam, MS_IN_SECOND);
    const cityDevelopmentPointsDelta = this.calculateCityDevelopmentPointsDelta(threads, usedRam, MS_IN_SECOND);

    return {
      money: this.formatter.formatNumberLong(moneyDelta),
      cityDevelopmentPoints: this.formatter.formatNumberLong(cityDevelopmentPointsDelta),
    };
  }

  buildProcessDescriptionParametersObject(threads: number, usedCores: number, usedRam: number) {
    const moneyDelta = this.calculateMoneyDelta(usedCores, usedRam, MS_IN_SECOND);
    const cityDevelopmentPointsDelta = this.calculateCityDevelopmentPointsDelta(usedCores, usedRam, MS_IN_SECOND);

    return {
      money: this.formatter.formatNumberLong(moneyDelta),
      cityDevelopmentPoints: this.formatter.formatNumberLong(cityDevelopmentPointsDelta),
    };
  }

  calculateMoneyDelta(threads: number, usedRam: number, passedTime: number): number {
    const programData = programs[this.name];

    return (
      passedTime *
      threads *
      usedRam *
      calculatePow(this.level - 1, programData.income as IExponent) *
      Math.pow(programData.incomeQualityMultiplier, this.quality) *
      (1 +
        (this.mainframeHardwareState.performance - 1) *
          this.scenarioState.currentValues.mainframeSoftware.performanceBoost)
    );
  }

  calculateCityDevelopmentPointsDelta(threads: number, usedRam: number, passedTime: number): number {
    const programData = programs[this.name];

    return (
      passedTime *
      threads *
      usedRam *
      calculatePow(this.level - 1, programData.cityDevelopmentPoints as IExponent) *
      Math.pow(programData.cityDevelopmentPointsQualityMultiplier, this.quality) *
      (1 +
        (this.mainframeHardwareState.performance - 1) *
          this.scenarioState.currentValues.mainframeSoftware.performanceBoost)
    );
  }
}
