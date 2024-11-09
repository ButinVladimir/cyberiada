import { IProgram } from '@state/progam-factory/interfaces/program';
import { EventBatcher } from '@shared/event-batcher';
import { IMainframeProcessesState, IProcess, IProcessParameters, ISerializedProcess } from './interfaces';
import { MAINFRAME_PROCESSES_STATE_UI_EVENTS } from './constants';

export class Process implements IProcess {
  private _mainframeProcessesState: IMainframeProcessesState;
  private _program: IProgram;
  private _isActive: boolean;
  private _threads: number;
  private _currentCompletionPoints: number;
  private _usedCores: number;

  private readonly _uiEventBatcher: EventBatcher;

  constructor(parameters: IProcessParameters) {
    this._mainframeProcessesState = parameters.mainframeProcessesState;
    this._program = parameters.program;
    this._isActive = parameters.isActive;
    this._threads = parameters.threads;
    this._currentCompletionPoints = parameters.currentCompletionPoints;
    this._usedCores = 0;

    this._uiEventBatcher = new EventBatcher();
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

  calculateCompletionDelta(passedTime: number): number {
    return this.program.calculateCompletionDelta(this._threads, this._usedCores, passedTime);
  }

  calculateCompletionTime(): number {
    return this.program.calculateCompletionTime(this._threads, this._usedCores);
  }

  toggleActive(active: boolean) {
    this._isActive = active;
    this._mainframeProcessesState.requestUpdateProcesses();
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
    this._mainframeProcessesState.requestUpdateProcesses();
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

  removeEventListeners() {
    this._uiEventBatcher.removeAllListeners();
  }
}
