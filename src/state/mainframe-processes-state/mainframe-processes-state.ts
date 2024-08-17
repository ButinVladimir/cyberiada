import { inject, injectable } from 'inversify';
import { v4 as uuid } from 'uuid';
import { ProgramName } from '@state/progam-factory/types';
import type { IMainframeHardwareState } from '@state/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import type { IMainframeOwnedProgramsState } from '@state/mainframe-owned-programs-state/interfaces/mainframe-owned-program-state';
import {
  IMainframeProcessesSerializedState,
  IMainframeProcessesState,
  IProcess,
  ISerializedProcess,
} from './interfaces';
import { TYPES } from '@state/types';
import { EventBatcher } from '@shared/event-batcher';
import { Process } from './process';
import { MAINFRAME_PROCESSES_STATE_UI_EVENTS } from './constants';

@injectable()
export class MainframeProcessesState implements IMainframeProcessesState {
  private _mainframeHardwareState: IMainframeHardwareState;
  private _mainframeOwnedProgramsState: IMainframeOwnedProgramsState;

  private _processes: IProcess[];

  private readonly _uiEventBatcher: EventBatcher;

  constructor(
    @inject(TYPES.MainframeHardwareState) _mainframeHardwareState: IMainframeHardwareState,
    @inject(TYPES.MainframeOwnedProgramsState) _mainframeOwnedProgramsState: IMainframeOwnedProgramsState,
  ) {
    this._mainframeHardwareState = _mainframeHardwareState;
    this._mainframeOwnedProgramsState = _mainframeOwnedProgramsState;

    this._processes = [];

    this._uiEventBatcher = new EventBatcher();
  }

  get processes() {
    return this._processes;
  }

  addProcess(programName: ProgramName): boolean {
    const program = this._mainframeOwnedProgramsState.getOwnedProgramByName(programName);
    if (!program) {
      return false;
    }

    const process = new Process({
      id: uuid(),
      isActive: true,
      currentCompletionPoints: 0,
      program: program,
      mainframeHardwareState: this._mainframeHardwareState,
    });

    this._processes.push(process);

    this.updateRunningProcesses();

    this._uiEventBatcher.enqueueEvent(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED);

    return true;
  }

  removeProcess(id: string) {
    const index = this._processes.findIndex((process) => process.id === id);

    if (index !== -1) {
      this._processes.splice(index, 1);
    }

    this.updateRunningProcesses();

    this._uiEventBatcher.enqueueEvent(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED);
  }

  updateRunningProcesses() {}

  processTick() {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._processes = [];
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IMainframeProcessesSerializedState): Promise<void> {
    this._processes = serializedState.processes.map(
      (serializedProcess: ISerializedProcess) =>
        new Process({
          id: serializedProcess.id,
          isActive: serializedProcess.isActive,
          program: this._mainframeOwnedProgramsState.getOwnedProgramByName(serializedProcess.programName)!,
          currentCompletionPoints: serializedProcess.currentCompletionPoints,
          mainframeHardwareState: this._mainframeHardwareState,
        }),
    );

    this.updateRunningProcesses();
  }

  serialize(): IMainframeProcessesSerializedState {
    return {
      processes: this.processes.map((process) => process.serialize()),
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
}
