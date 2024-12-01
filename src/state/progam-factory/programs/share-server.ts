import { MS_IN_SECOND } from '@shared/constants';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
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
    const developmentPointsDelta = this.calculateDevelopmentPointsDelta(
      threads,
      usedRam,
      this._settingsState.updateInterval,
    );

    this.globalState.money.increase(moneyDelta, IncomeSource.program);
    this.globalState.development.increase(developmentPointsDelta, IncomeSource.program);
  }

  buildProgramDescriptionParametersObject(threads: number, usedRam: number) {
    const moneyDelta = this.calculateMoneyDelta(threads, usedRam, MS_IN_SECOND);
    const developmentPointsDelta = this.calculateDevelopmentPointsDelta(threads, usedRam, MS_IN_SECOND);

    return {
      money: this.formatter.formatNumberLong(moneyDelta),
      developmentPoints: this.formatter.formatNumberLong(developmentPointsDelta),
    };
  }

  buildProcessDescriptionParametersObject(threads: number, usedCores: number, usedRam: number) {
    const moneyDelta = this.calculateMoneyDelta(usedCores, usedRam, MS_IN_SECOND);
    const developmentPointsDelta = this.calculateDevelopmentPointsDelta(usedCores, usedRam, MS_IN_SECOND);

    return {
      money: this.formatter.formatNumberLong(moneyDelta),
      developmentPoints: this.formatter.formatNumberLong(developmentPointsDelta),
    };
  }

  calculateMoneyDelta(threads: number, usedRam: number, passedTime: number): number {
    const programData = programs[this.name];

    return (
      this.calculateModifier(threads, usedRam, passedTime) *
      programData.money *
      Math.pow(programData.moneyQualityMultiplier, this.quality)
    );
  }

  calculateDevelopmentPointsDelta(threads: number, usedRam: number, passedTime: number): number {
    const programData = programs[this.name];

    return (
      this.calculateModifier(threads, usedRam, passedTime) *
      programData.developmentPoints *
      Math.pow(programData.developmentPointsQualityMultiplier, this.quality)
    );
  }

  private calculateModifier(threads: number, usedRam: number, passedTime: number): number {
    const programData = programs[this.name];

    return (
      passedTime *
      Math.pow(threads * usedRam, programData.scalableResourcesModifier) *
      this.level *
      (1 +
        (this.mainframeHardwareState.performance.level - 1) *
          this.scenarioState.currentValues.mainframeSoftware.performanceBoost)
    );
  }
}
