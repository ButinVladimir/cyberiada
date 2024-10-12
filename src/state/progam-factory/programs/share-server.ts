import { MS_IN_SECOND } from '@shared/constants';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { MAINFRAME_HARDWARE_STATE_EVENTS } from '@state/mainframe/mainframe-hardware-state/constants';
import { IExponent } from '@shared/interfaces/exponent';
import { calculatePow } from '@shared/helpers';
import programs from '@configs/programs.json';
import { ProgramName } from '../types';
import { IShareServerParameters } from '../interfaces/program-parameters/share-server-parameters';
import { BaseProgram } from './base-program';
import { PROGRAMS_UI_EVENTS } from '../constants';

export class ShareServerProgram extends BaseProgram {
  public readonly name = ProgramName.shareServer;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = true;
  private _scenarioState: IScenarioState;
  private _settingsState: ISettingsState;
  private _mainframeHardwareState: IMainframeHardwareState;

  constructor(parameters: IShareServerParameters) {
    super(parameters);

    this._scenarioState = parameters.scenarioState;
    this._settingsState = parameters.settingsState;
    this._mainframeHardwareState = parameters.mainframeHardwareState;

    this._mainframeHardwareState.addStateEventListener(
      MAINFRAME_HARDWARE_STATE_EVENTS.HARDWARE_UPDATED,
      this.handleHardwareUpdate,
    );
  }

  perform(threads: number, usedRam: number): void {
    const moneyDelta = this.calculateMoneyDelta(threads, usedRam, this._settingsState.updateInterval);
    const cityDevelopmentPointsDelta = this.calculateCityDevelopmentPointsDelta(
      threads,
      usedRam,
      this._settingsState.updateInterval,
    );

    this.generalState.increaseMoney(moneyDelta);
    this.generalState.increaseCityDevelopmentPoints(cityDevelopmentPointsDelta);
  }

  removeEventListeners() {
    this._mainframeHardwareState.removeStateEventListener(
      MAINFRAME_HARDWARE_STATE_EVENTS.HARDWARE_UPDATED,
      this.handleHardwareUpdate,
    );
    this.uiEventBatcher.removeAllListeners();
    this.stateEventEmitter.removeAllListeners();
  }

  buildDescriptionParametersObject(threads: number, usedRam: number) {
    const moneyDelta = this.calculateMoneyDelta(threads, usedRam, MS_IN_SECOND);
    const cityDevelopmentPointsDelta = this.calculateCityDevelopmentPointsDelta(threads, usedRam, MS_IN_SECOND);

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
      calculatePow(
        this._mainframeHardwareState.performance,
        this._scenarioState.currentValues.mainframeSoftware.performanceBoost,
      )
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
      calculatePow(
        this._mainframeHardwareState.performance,
        this._scenarioState.currentValues.mainframeSoftware.performanceBoost,
      )
    );
  }

  private handleHardwareUpdate = () => {
    this.uiEventBatcher.enqueueEvent(PROGRAMS_UI_EVENTS.PROGRAM_UPDATED);
  };
}
