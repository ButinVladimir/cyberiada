import { IProgram } from '@state/progam-factory/interfaces/program';
import { EventBatcher } from '@shared/event-batcher';
import { IProgramFactory } from '@state/progam-factory/interfaces/program-factory';
import { IDevelopingProgram, IDevelopingProgramParameters, ISerializedDevelopingProgram } from './interfaces';
import { MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS } from './constants';

export class DevelopingProgram implements IDevelopingProgram {
  private _programFactory: IProgramFactory;

  private _program: IProgram;
  private _isActive: boolean;
  private _currentDevelopmentPoints: number;

  private readonly _uiEventBatcher: EventBatcher;

  constructor(parameters: IDevelopingProgramParameters) {
    this._programFactory = parameters.programFactory;

    this._program = parameters.program;
    this._isActive = parameters.isActive;
    this._currentDevelopmentPoints = parameters.currentDevelopmentPoints;

    this._uiEventBatcher = new EventBatcher();
  }

  get program() {
    return this._program;
  }

  get isActive() {
    return this._isActive;
  }

  get currentDevelopmentPoints() {
    return this._currentDevelopmentPoints;
  }

  update(program: IProgram): void {
    this._program.removeEventListeners();
    this._programFactory.deleteProgram(this._program);
    this._program = program;
    this._currentDevelopmentPoints = 0;

    this._uiEventBatcher.enqueueEvent(MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAM_UPDATED);
  }

  toggleActive(active: boolean) {
    this._isActive = active;
    this._uiEventBatcher.enqueueEvent(MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAM_UPDATED);
  }

  increaseDevelopment(delta: number): void {
    this._currentDevelopmentPoints += delta;

    const maxDevelopmentPoints = this.program.developmentPoints;

    if (this._currentDevelopmentPoints > maxDevelopmentPoints) {
      this._currentDevelopmentPoints = maxDevelopmentPoints;
    }

    this._uiEventBatcher.enqueueEvent(
      MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAM_PROGRESS_UPDATED,
    );
  }

  serialize(): ISerializedDevelopingProgram {
    return {
      programName: this.program.name,
      level: this.program.level,
      quality: this.program.quality,
      isActive: this.isActive,
      currentDevelopmentPoints: this.currentDevelopmentPoints,
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
    this._program.removeEventListeners();
    this._uiEventBatcher.removeAllListeners();
  }
}
