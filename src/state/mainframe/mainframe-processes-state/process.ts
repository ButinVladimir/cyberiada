import { IProgram } from '@state/progam-factory/interfaces/program';
import { EventBatcher } from '@shared/event-batcher';
import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IMainframeProcessesState, IProcess, IProcessParameters, ISerializedProcess } from './interfaces';
import { MAINFRAME_PROCESSES_STATE_UI_EVENTS } from './constants';

export class Process implements IProcess {
  readonly uiEventBatcher: EventBatcher;

  private _stateUiConnector: IStateUIConnector;
  private _mainframeProcessesState: IMainframeProcessesState;
  private _program: IProgram;
  private _isActive: boolean;
  private _threads: number;
  private _currentCompletionPoints: number;
  private _usedCores: number;

  constructor(parameters: IProcessParameters) {
    this._stateUiConnector = parameters.stateUiConnector;
    this._mainframeProcessesState = parameters.mainframeProcessesState;
    this._program = parameters.program;
    this._isActive = parameters.isActive;
    this._threads = parameters.threads;
    this._currentCompletionPoints = parameters.currentCompletionPoints;
    this._usedCores = 0;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get program() {
    return this._program;
  }

  get isActive() {
    this._stateUiConnector.connectEventHandler(this, MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_UPDATED);

    return this._isActive;
  }

  get threads() {
    this._stateUiConnector.connectEventHandler(this, MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_UPDATED);

    return this._threads;
  }

  get currentCompletionPoints() {
    this._stateUiConnector.connectEventHandler(this, MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_PROGRESS_UPDATED);

    return this._currentCompletionPoints;
  }

  get maxCompletionPoints() {
    return this.program.completionPoints * this.threads;
  }

  get totalRam() {
    return this.program.ram * this.threads;
  }

  get usedCores() {
    this._stateUiConnector.connectEventHandler(this, MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_UPDATED);

    return this._usedCores;
  }

  set usedCores(value: number) {
    this._usedCores = value;

    this.uiEventBatcher.enqueueEvent(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_UPDATED);
  }

  get maxCores() {
    return this.threads * this.program.cores;
  }

  calculateCompletionDelta(passedTime: number): number {
    return this.program.calculateCompletionDelta(this.threads, this.usedCores, passedTime);
  }

  calculateCompletionTime(): number {
    return this.program.calculateCompletionTime(this.threads, this.usedCores);
  }

  toggleActive(active: boolean) {
    this._isActive = active;
    this._mainframeProcessesState.requestUpdateProcesses();

    this.uiEventBatcher.enqueueEvent(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_UPDATED);
  }

  increaseCompletion(delta: number): void {
    this._currentCompletionPoints += delta;

    const maxCompletionPoints = this.maxCompletionPoints;

    if (this._currentCompletionPoints > maxCompletionPoints) {
      this._currentCompletionPoints = maxCompletionPoints;
    }

    this.uiEventBatcher.enqueueEvent(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_PROGRESS_UPDATED);
  }

  resetCompletion(): void {
    this._currentCompletionPoints = 0;

    this.uiEventBatcher.enqueueEvent(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_PROGRESS_UPDATED);
  }

  update(threads: number) {
    this._threads = threads;
    this.resetCompletion();
    this._mainframeProcessesState.requestUpdateProcesses();

    this.uiEventBatcher.enqueueEvent(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESS_UPDATED);
  }

  serialize(): ISerializedProcess {
    return {
      programName: this.program.name,
      isActive: this.isActive,
      threads: this._threads,
      currentCompletionPoints: this.currentCompletionPoints,
    };
  }

  removeEventListeners() {
    this._stateUiConnector.unregisterEventEmitter(this);
  }
}
