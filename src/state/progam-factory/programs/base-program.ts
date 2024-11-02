import programs from '@configs/programs.json';
import { IFormatter } from '@shared/interfaces/formatter';
import { EventBatcher } from '@shared/event-batcher';
import { IExponent } from '@shared/interfaces/exponent';
import { calculatePow } from '@shared/helpers';
import { IGlobalState } from '@state/global-state/interfaces/global-state';
import { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { ProgramName } from '../types';
import { IProgram } from '../interfaces/program';
import { IMakeProgramParameters } from '../interfaces/make-program-parameters';
import { IBaseProgramParameters } from '../interfaces/program-parameters/base-program-parameters';
import { PROGRAMS_UI_EVENTS } from '../constants';

export abstract class BaseProgram implements IProgram {
  protected globalState: IGlobalState;
  protected mainframeProcessesState: IMainframeProcessesState;
  protected mainframeHardwareState: IMainframeHardwareState;
  protected formatter: IFormatter;

  private _level!: number;
  private _quality!: number;

  protected readonly uiEventBatcher: EventBatcher;

  abstract get name(): ProgramName;

  constructor(parameters: IBaseProgramParameters) {
    this.globalState = parameters.globalState;
    this.mainframeProcessesState = parameters.mainframeProcessesState;
    this.mainframeHardwareState = parameters.mainframeHardwareState;
    this.formatter = parameters.formatter;

    this._level = parameters.level;
    this._quality = parameters.quality;

    this.uiEventBatcher = new EventBatcher();
  }

  get level() {
    return this._level;
  }

  get quality() {
    return this._quality;
  }

  get completionPoints() {
    const programData = programs[this.name];

    return calculatePow(
      this.globalState.cityDevelopment.level - this._level,
      programData.completionPoints as IExponent,
    );
  }

  abstract get isRepeatable(): boolean;

  abstract get isAutoscalable(): boolean;

  get cost(): number {
    const programData = programs[this.name];

    return (
      (1 - this.globalState.computationalBase.discount) *
      calculatePow(this._level - 1, programData.cost as IExponent) *
      Math.pow(programData.costQualityMultiplier, this.quality)
    );
  }

  get ram(): number {
    return programs[this.name].ram;
  }

  get cores() {
    return this.quality + 1;
  }

  abstract perform(usedCores: number, usedRam: number): void;

  update(newProgram: IProgram): void {
    if (this.name !== newProgram.name) {
      throw new Error(`Unable to update program ${this.name} with ${newProgram.name}`);
    }

    this._level = newProgram.level;
    this._quality = newProgram.quality;

    this.mainframeProcessesState.requestUpdateProcesses();

    this.uiEventBatcher.enqueueEvent(PROGRAMS_UI_EVENTS.PROGRAM_UPDATED);
  }

  removeEventListeners(): void {
    this.uiEventBatcher.removeAllListeners();
  }

  serialize(): IMakeProgramParameters {
    return {
      name: this.name,
      level: this.level,
      quality: this.quality,
    };
  }

  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this.uiEventBatcher.addListener(eventName, handler);
  }

  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this.uiEventBatcher.removeListener(eventName, handler);
  }

  fireUiEvents() {
    this.uiEventBatcher.fireEvents();
  }

  buildCostParametersObject(): object {
    return {
      cost: this.formatter.formatNumberLong(this.cost),
    };
  }

  buildRequirementsParametersObject(threads: number): object {
    return {
      cores: this.formatter.formatNumberDecimal(this.cores * threads),
      ram: this.formatter.formatNumberDecimal(this.ram * threads),
      completionPoints: this.formatter.formatNumberLong(this.completionPoints * threads),
      threads: this.formatter.formatNumberDecimal(threads),
    };
  }

  abstract buildDescriptionParametersObject(usedCores: number, usedRam: number): object;
}
