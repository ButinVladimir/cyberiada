import { EventEmitter } from 'eventemitter3';
import programs from '@configs/programs.json';
import { IFormatter } from "@shared/interfaces/formatter";
import { EventBatcher } from '@shared/event-batcher';
import { ProgramName } from '../types';
import { IProgram } from '../interfaces/program';
import { IMakeProgramParameters } from '../interfaces/make-program-parameters';
import { IBaseProgramParameters } from '../interfaces/program-parameters/base-program-parameters';
import { PROGRAMS_STATE_EVENTS, PROGRAMS_UI_EVENTS } from '../constants';

export abstract class BaseProgram implements IProgram {
  protected formatter: IFormatter;

  private _level!: number;
  private _quality!: number;

  protected readonly uiEventBatcher: EventBatcher;
  protected readonly stateEventEmitter: EventEmitter;

  abstract get name(): ProgramName;

  constructor(parameters: IBaseProgramParameters) {
    this.formatter = parameters.formatter;

    this._level = parameters.level;
    this._quality = parameters.quality;

    this.uiEventBatcher = new EventBatcher();
    this.stateEventEmitter = new EventEmitter();
  }

  get level() {
    return this._level;
  }

  get quality() {
    return this._quality;
  }

  get completionPoints() {
    return programs[this.name].processCompletionPoints;
  }

  get developmentPoints() {
    const programData = programs[this.name];

    return (
      programData.developmentPoints *
      Math.pow(programData.levelCostMultiplier, this.level - 1) *
      Math.pow(programData.qualityDevelopmentPointsMultiplier, this.quality)
    );
  }

  abstract get isRepeatable(): boolean;

  abstract get isAutoscalable(): boolean;

  get cost(): number {
    const programData = programs[this.name];

    return (
      programData.baseCost *
      Math.pow(programData.levelCostMultiplier, this.level - 1) *
      Math.pow(programData.qualityCostMultiplier, this.quality)
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

    this.stateEventEmitter.emit(PROGRAMS_STATE_EVENTS.PROGRAM_UPDATED);
    this.uiEventBatcher.enqueueEvent(PROGRAMS_UI_EVENTS.PROGRAM_UPDATED);
  }

  abstract removeEventListeners(): void;

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

  addStateEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this.stateEventEmitter.addListener(eventName, handler);
  }

  removeStateEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this.stateEventEmitter.removeListener(eventName, handler);
  }

  buildCostParametersObject(): object {
    return {
      cost: this.formatter.formatNumberLong(this.cost),
      developmentPoints: this.formatter.formatNumberLong(this.developmentPoints),
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
