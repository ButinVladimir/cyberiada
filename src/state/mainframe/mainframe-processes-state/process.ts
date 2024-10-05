import { EventEmitter } from 'eventemitter3';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { EventBatcher } from '@shared/event-batcher';
import { PROGRAMS_STATE_EVENTS } from '@state/progam-factory/constants';
import { IProcess, IProcessParameters, ISerializedProcess } from './interfaces';
import { MAINFRAME_PROCESSES_STATE_UI_EVENTS, MAINFRAME_PROCESSES_STATE_EVENTS } from './constants';

export class Process implements IProcess {
  private _program: IProgram;
  private _isActive: boolean;
  private _threads: number;
  private _currentCompletionPoints: number;
  private _usedCores: number;

  private readonly _uiEventBatcher: EventBatcher;
  private readonly _stateEventEmitter: EventEmitter;

  constructor(parameters: IProcessParameters) {
    this._program = parameters.program;
    this._isActive = parameters.isActive;
    this._threads = parameters.threads;
    this._currentCompletionPoints = parameters.currentCompletionPoints;
    this._usedCores = 0;

    this._uiEventBatcher = new EventBatcher();
    this._stateEventEmitter = new EventEmitter();

    this._program.addStateEventListener(PROGRAMS_STATE_EVENTS.PROGRAM_UPDATED, this.handleProgramUpdate);
  }

  get program() {
    return this._program;
  }

  get isActive() {
    return this._isActive;
  }

  get threads() {
    return this._threads;
  }

  get currentCompletionPoints() {
    return this._currentCompletionPoints;
  }

  get maxCompletionPoints() {
    return this.program.completionPoints * this.threads;
  }

  get totalRam() {
    return this.program.ram * this.threads;
  }

  get usedCores() {
    return this._usedCores;
  }

  set usedCores(value: number) {
    this._usedCores = value;
    this._uiEventBatcher.enqueueEvent(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_UPDATED);
  }

  get maxCores() {
    return this._threads * this.program.cores;
  }

  toggleActive(active: boolean) {
    this._isActive = active;
    this._stateEventEmitter.emit(MAINFRAME_PROCESSES_STATE_EVENTS.PROCESS_TOGGLED);
  }

  increaseCompletion(delta: number): void {
    this._currentCompletionPoints += delta;

    const maxCompletionPoints = this.maxCompletionPoints;

    if (this._currentCompletionPoints > maxCompletionPoints) {
      this._currentCompletionPoints = maxCompletionPoints;
    }

    this._uiEventBatcher.enqueueEvent(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_PROGRESS_UPDATED);
  }

  resetCompletion(): void {
    this._currentCompletionPoints = 0;
    this._uiEventBatcher.enqueueEvent(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_PROGRESS_UPDATED);
  }

  update(threads: number) {
    this._threads = threads;
    this.resetCompletion();
    this._uiEventBatcher.enqueueEvent(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_UPDATED);
  }

  serialize(): ISerializedProcess {
    return {
      programName: this.program.name,
      isActive: this.isActive,
      threads: this._threads,
      currentCompletionPoints: this.currentCompletionPoints,
    };
  }

  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._uiEventBatcher.addListener(eventName, handler);
  }

  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._uiEventBatcher.removeListener(eventName, handler);
  }

  fireUiEvents() {
    this._uiEventBatcher.fireEvents();
  }

  addStateEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._stateEventEmitter.addListener(eventName, handler);
  }

  removeStateEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._stateEventEmitter.removeListener(eventName, handler);
  }

  removeEventListeners() {
    this._program.removeStateEventListener(PROGRAMS_STATE_EVENTS.PROGRAM_UPDATED, this.handleProgramUpdate);
    this._uiEventBatcher.removeAllListeners();
    this._stateEventEmitter.removeAllListeners();
  }

  private handleProgramUpdate = () => {
    this._uiEventBatcher.enqueueEvent(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_UPDATED);
    this._stateEventEmitter.emit(MAINFRAME_PROCESSES_STATE_EVENTS.PROCESS_PROGRAM_UPDATED);
  };
}
