import programs from '@configs/programs.json';
import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IFormatter } from '@shared/interfaces/formatter';
import { EventBatcher } from '@shared/event-batcher';
import { IExponent } from '@shared/interfaces/exponent';
import { calculatePow } from '@shared/helpers';
import { IGlobalState } from '@state/global-state/interfaces/global-state';
import { IMainframeProgramsState } from '@state/mainframe/mainframe-programs-state/interfaces/mainframe-programs-state';
import { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { Feature } from '@shared/types';
import { ProgramName } from '../types';
import { IMakeProgramParameters } from '../interfaces/make-program-parameters';
import { IBaseProgramParameters } from '../interfaces/program-parameters/base-program-parameters';
import { PROGRAMS_UI_EVENTS } from '../constants';
import { IProgram } from '../interfaces';

export abstract class BaseProgram implements IProgram {
  readonly uiEventBatcher: EventBatcher;

  protected stateUiConnector: IStateUIConnector;
  protected globalState: IGlobalState;
  protected mainframeProgramsState: IMainframeProgramsState;
  protected mainframeProcessesState: IMainframeProcessesState;
  protected mainframeHardwareState: IMainframeHardwareState;
  protected scenarioState: IScenarioState;
  protected formatter: IFormatter;

  private _level!: number;
  private _quality!: number;
  private _autoUpgradeEnabled: boolean;

  abstract get name(): ProgramName;

  constructor(parameters: IBaseProgramParameters) {
    this.stateUiConnector = parameters.stateUiConnector;
    this.globalState = parameters.globalState;
    this.mainframeProgramsState = parameters.mainframeProgramsState;
    this.mainframeProcessesState = parameters.mainframeProcessesState;
    this.mainframeHardwareState = parameters.mainframeHardwareState;
    this.scenarioState = parameters.scenarioState;
    this.formatter = parameters.formatter;

    this._level = parameters.level;
    this._quality = parameters.quality;

    this._autoUpgradeEnabled = parameters.autoUpgradeEnabled;

    this.uiEventBatcher = new EventBatcher();
    this.stateUiConnector.registerEventEmitter(this);
  }

  get level() {
    this.stateUiConnector.connectEventHandler(this, PROGRAMS_UI_EVENTS.PROGRAM_UPGRADED);

    return this._level;
  }

  get quality() {
    this.stateUiConnector.connectEventHandler(this, PROGRAMS_UI_EVENTS.PROGRAM_UPGRADED);

    return this._quality;
  }

  get completionPoints() {
    const programData = programs[this.name];

    return calculatePow(this.globalState.development.level - this.level, programData.completionPoints as IExponent);
  }

  get autoUpgradeEnabled() {
    this.stateUiConnector.connectEventHandler(this, PROGRAMS_UI_EVENTS.PROGRAM_UPGRADED);

    return this._autoUpgradeEnabled;
  }

  set autoUpgradeEnabled(value: boolean) {
    this._autoUpgradeEnabled = value;

    this.uiEventBatcher.enqueueEvent(PROGRAMS_UI_EVENTS.PROGRAM_UPGRADED);
    this.mainframeProgramsState.requestUiUpdate();
  }

  abstract get isRepeatable(): boolean;

  abstract get isAutoscalable(): boolean;

  get cost(): number {
    const programData = programs[this.name];

    return (
      (1 - this.globalState.computationalBase.discount) *
      calculatePow(this.level - 1, programData.cost as IExponent) *
      Math.pow(programData.costQualityMultiplier, this.quality)
    );
  }

  get ram(): number {
    return programs[this.name].ram;
  }

  get cores() {
    return this.quality + 1;
  }

  get unlockFeatures() {
    return programs[this.name].unlockFeatures as Feature[];
  }

  abstract perform(usedCores: number, usedRam: number): void;

  upgrade(newProgram: IProgram): void {
    if (this.name !== newProgram.name) {
      throw new Error(`Unable to update program ${this.name} with ${newProgram.name}`);
    }

    this._level = newProgram.level;
    this._quality = newProgram.quality;

    this.mainframeProcessesState.requestUpdateProcesses();

    this.uiEventBatcher.enqueueEvent(PROGRAMS_UI_EVENTS.PROGRAM_UPGRADED);
  }

  calculateCompletionDelta(threads: number, usedCores: number, passedTime: number): number {
    const currentSpeed = usedCores * this.globalState.programCompletionSpeed.speed;
    const allowedSpeed =
      (threads * this.completionPoints) / this.scenarioState.currentValues.mainframeSoftware.minCompletionTime;

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

  removeEventListeners(): void {
    this.stateUiConnector.unregisterEventEmitter(this);
  }

  serialize(): IMakeProgramParameters {
    return {
      name: this.name,
      level: this.level,
      quality: this.quality,
      autoUpgradeEnabled: this.autoUpgradeEnabled,
    };
  }
}
