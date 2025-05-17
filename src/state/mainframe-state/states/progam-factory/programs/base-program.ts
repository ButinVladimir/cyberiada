import programs from '@configs/programs.json';
import { type IStateUIConnector } from '@state/state-ui-connector';
import { type IFormatter, calculatePower } from '@shared/index';
import { type IGlobalState } from '@state/global-state';
import { type IMainframeState } from '@state/mainframe-state';
import { Feature } from '@shared/types';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { ProgramName } from '../types';
import { IBaseProgramParameters, IMakeProgramParameters } from '../interfaces';
import { IProgram } from '../interfaces';

const { lazyInject } = decorators;

export abstract class BaseProgram implements IProgram {
  @lazyInject(TYPES.StateUIConnector)
  protected stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  protected globalState!: IGlobalState;

  @lazyInject(TYPES.MainframeState)
  protected mainframeState!: IMainframeState;

  @lazyInject(TYPES.Formatter)
  protected formatter!: IFormatter;

  private _level!: number;
  private _quality!: number;
  private _autoUpgradeEnabled: boolean;

  abstract get name(): ProgramName;

  constructor(parameters: IBaseProgramParameters) {
    this._level = parameters.level;
    this._quality = parameters.quality;

    this._autoUpgradeEnabled = parameters.autoUpgradeEnabled;

    this.stateUiConnector.registerEventEmitter(this, ['_level', '_quality', '_autoUpgradeEnabled']);
  }

  get level() {
    return this._level;
  }

  get quality() {
    return this._quality;
  }

  get completionPoints() {
    const programData = programs[this.name];

    return calculatePower(this.globalState.development.level - this.level, programData.completionPoints);
  }

  get autoUpgradeEnabled() {
    return this._autoUpgradeEnabled;
  }

  set autoUpgradeEnabled(value: boolean) {
    this._autoUpgradeEnabled = value;
  }

  abstract get isAutoscalable(): boolean;

  get ram(): number {
    return programs[this.name].ram;
  }

  get cores() {
    return this.quality + 1;
  }

  get unlockFeatures() {
    return programs[this.name].requiredFeatures as Feature[];
  }

  abstract handlePerformanceUpdate(): void;

  abstract perform(usedCores: number, usedRam: number): void;

  upgrade(quality: number, level: number): void {
    this._quality = quality;
    this._level = level;

    this.handlePerformanceUpdate();
    this.mainframeState.processes.requestUpdateProcesses();
  }

  calculateCompletionDelta(threads: number, usedCores: number, passedTime: number): number {
    const currentSpeed = usedCores * this.mainframeState.processes.processCompletionSpeed.totalMultiplier;
    const allowedSpeed =
      (threads * this.completionPoints) /
      this.globalState.scenario.currentValues.mainframeSoftware.minProcessCompletionTime;

    return passedTime * Math.min(currentSpeed, allowedSpeed);
  }

  calculateCompletionTime(threads: number, usedCores: number): number {
    const completionPoints = threads * this.completionPoints;
    const completionDelta = this.calculateCompletionDelta(threads, usedCores, 1);

    return completionPoints / completionDelta;
  }

  calculateCompletionMinTime(threads: number): number {
    return this.calculateCompletionTime(threads, this.cores * threads);
  }

  calculateCompletionMaxTime(threads: number): number {
    return this.calculateCompletionTime(threads, 1);
  }

  serialize(): IMakeProgramParameters {
    return {
      name: this.name,
      level: this.level,
      quality: this.quality,
      autoUpgradeEnabled: this.autoUpgradeEnabled,
    };
  }

  removeAllEventListeners() {
    this.stateUiConnector.unregisterEventEmitter(this);
  }
}
