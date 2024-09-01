import { inject, injectable } from 'inversify';
import { ProgramName } from '@state/progam-factory/types';
import type { IMainframeHardwareState } from '@state/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import type { IMainframeOwnedProgramsState } from '@state/mainframe-owned-programs-state/interfaces/mainframe-owned-program-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import {
  IMainframeProcessesSerializedState,
  IMainframeProcessesState,
  IProcess,
  ISerializedProcess,
} from './interfaces';
import { TYPES } from '@state/types';
import { EventBatcher } from '@shared/event-batcher';
import { ProgramsEvent } from '@shared/types';
import { MAINFRAME_HARDWARE_STATE_EVENTS } from '@state/mainframe-hardware-state/constants';
import { Process } from './process';
import { MAINFRAME_PROCESSES_STATE_UI_EVENTS } from './constants';

@injectable()
export class MainframeProcessesState implements IMainframeProcessesState {
  private _settingsState: ISettingsState;
  private _mainframeHardwareState: IMainframeHardwareState;
  private _mainframeOwnedProgramsState: IMainframeOwnedProgramsState;
  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;

  private _processes: IProcess[];
  private _runningProcesses: IProcess[];
  private _availableCores: number;
  private _availableRam: number;
  private _runningPassiveProcess?: IProcess;

  private readonly _uiEventBatcher: EventBatcher;

  constructor(
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
    @inject(TYPES.MainframeHardwareState) _mainframeHardwareState: IMainframeHardwareState,
    @inject(TYPES.MainframeOwnedProgramsState) _mainframeOwnedProgramsState: IMainframeOwnedProgramsState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
    @inject(TYPES.Formatter) _formatter: IFormatter,
  ) {
    this._settingsState = _settingsState;
    this._mainframeHardwareState = _mainframeHardwareState;
    this._mainframeOwnedProgramsState = _mainframeOwnedProgramsState;
    this._messageLogState = _messageLogState;
    this._formatter = _formatter;

    this._processes = [];
    this._runningProcesses = [];
    this._availableCores = 0;
    this._availableRam = 0;

    this._uiEventBatcher = new EventBatcher();

    this._mainframeHardwareState.addStateEventListener(MAINFRAME_HARDWARE_STATE_EVENTS.HARDWARE_UPDATED, this.updateRunningProcesses);
  }

  get availableCores() {
    return this._availableCores;
  }

  get availableRam() {
    return this._availableRam;
  }

  listProcesses(): IProcess[] {
    return this._processes;
  }

  getProcessByName(programName: ProgramName): IProcess {
    const process = this._processes.find((process) => process.program.name === programName);

    if (!process) {
      throw new Error(`Process ${programName} is not found`);
    }

    return process;
  }

  addProcess(programName: ProgramName, threads: number): boolean {
    const program = this._mainframeOwnedProgramsState.getOwnedProgramByName(programName);
    if (!program) {
      return false;
    }

    if (program.isAutoscalable) {
      this.deletePassiveProcesses();
    } else {
      this.deleteProcess(programName);
    }

    if (!program.isAutoscalable && threads <= 0) {
      throw new Error('Invalid amount of threads for process');
    }

    const threadCount = program.isAutoscalable ? 0 : threads;

    const process = new Process({
      isActive: true,
      threads: threadCount,
      currentCompletionPoints: 0,
      program: program,
      settingsState: this._settingsState,
      mainframeHardwareState: this._mainframeHardwareState,
      mainframeProcessesState: this,
    });

    this._processes.push(process);

    this.updateRunningProcesses();

    this._messageLogState.postMessage(ProgramsEvent.processStarted, {
      programName: program.name,
      threads: this._formatter.formatNumberDecimal(threadCount),
    });

    return true;
  }

  deleteProcess(programName: ProgramName): void {
    let index = 0;
    let process: IProcess;

    while (index < this._processes.length) {
      process = this._processes[index];

      if (process.program.name === programName) {
        this._processes.splice(index, 1);

        this._messageLogState.postMessage(ProgramsEvent.processDeleted, {
          programName: process.program.name,
          threads: this._formatter.formatNumberDecimal(process.threads),
        });
      } else {
        index++;
      }
    }

    this.updateRunningProcesses();
  }

  processTick() {
    if (this._runningPassiveProcess && this._runningPassiveProcess.isActive) {
      this._runningPassiveProcess.program.perform(this._availableCores, this._availableRam);
    }

    let availableCores = this._mainframeHardwareState.cores;
    let cores = 0;
    let hasFinishedProcesses = false;

    for (const process of this._runningProcesses) {
      cores = Math.min(process.threads * process.program.cores, availableCores);

      if (cores > 0) {
        availableCores -= cores;
        process.increaseCompletion(cores);

        if (process.currentCompletionPoints >= process.maxCompletionPoints) {
          process.program.perform(process.threads, process.totalRam);
          hasFinishedProcesses = true;
        }
      }
    }

    if (hasFinishedProcesses) {
      this.updateFinishedProcesses();
      this.updateRunningProcesses();
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._processes = [];
    this.updateRunningProcesses();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IMainframeProcessesSerializedState): Promise<void> {
    this._processes = serializedState.processes.map(
      (serializedProcess: ISerializedProcess) =>
        new Process({
          isActive: serializedProcess.isActive,
          threads: serializedProcess.threads,
          program: this._mainframeOwnedProgramsState.getOwnedProgramByName(serializedProcess.programName)!,
          currentCompletionPoints: serializedProcess.currentCompletionPoints,
          settingsState: this._settingsState,
          mainframeHardwareState: this._mainframeHardwareState,
          mainframeProcessesState: this,
        }),
    );

    this.updateRunningProcesses();
  }

  serialize(): IMainframeProcessesSerializedState {
    return {
      processes: this._processes.map((process) => process.serialize()),
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

  private updateRunningProcesses = () => {
    this._availableCores = this._mainframeHardwareState.cores;
    this._availableRam = this._mainframeHardwareState.ram;
    this._runningProcesses.splice(0);
    this._runningPassiveProcess = this._processes.find((process) => process.program.isAutoscalable);

    let processRam = 0;
    let cores = 0;

    for (const process of this._processes) {
      if (process.program.isAutoscalable) { 
        continue;
      }

      processRam = process.totalRam;
      this._availableRam -= processRam;

      if (!process.isActive) {
        continue;
      }

      cores = Math.min(process.threads * process.program.cores, this._availableCores);

      if (cores > 0) {
        this._runningProcesses.push(process);
        this._availableCores -= cores;
      }
    }

    this._uiEventBatcher.enqueueEvent(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED);
  }

  private deletePassiveProcesses(): void {
    let index = 0;
    let process: IProcess;

    while (index < this._processes.length) {
      process = this._processes[index];

      if (process.program.isAutoscalable) {
        this._processes.splice(index, 1);

        this._messageLogState.postMessage(ProgramsEvent.processDeleted, {
          programName: process.program.name,
          threads: this._formatter.formatNumberDecimal(process.threads),
        });
      } else {
        index++;
      }
    }
  }

  private updateFinishedProcesses(): void {
    let index = 0;
    let process: IProcess;

    while (index < this._processes.length) {
      process = this._processes[index];

      if (!process.program.isAutoscalable && process.currentCompletionPoints >= process.maxCompletionPoints) {
        this._processes.splice(index, 1);

        if (process.program.isRepeatable) {
          process.resetCompletion();
          this._processes.push(process);
        } else {
          this._messageLogState.postMessage(ProgramsEvent.processDeleted, {
            programName: process.program.name,
            threads: this._formatter.formatNumberDecimal(process.threads),
          });
        }
      } else {
        index++;
      }
    }
  }
}
