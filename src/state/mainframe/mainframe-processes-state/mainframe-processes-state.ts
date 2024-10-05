import { inject, injectable } from 'inversify';
import { ProgramName } from '@state/progam-factory/types';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import type { IMainframeOwnedProgramsState } from '@state/mainframe/mainframe-owned-programs-state/interfaces/mainframe-owned-program-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from '@state/types';
import { EventBatcher } from '@shared/event-batcher';
import { ProgramsEvent } from '@shared/types';
import { calculatePow } from '@shared/helpers';
import { MAINFRAME_HARDWARE_STATE_EVENTS } from '@state/mainframe/mainframe-hardware-state/constants';
import {
  IMainframeProcessesSerializedState,
  IMainframeProcessesState,
  IProcess,
  ISerializedProcess,
} from './interfaces';
import { Process } from './process';
import { MAINFRAME_PROCESSES_STATE_UI_EVENTS, MAINFRAME_PROCESSES_STATE_EVENTS } from './constants';

@injectable()
export class MainframeProcessesState implements IMainframeProcessesState {
  private _scenarioState: IScenarioState;
  private _settingsState: ISettingsState;
  private _mainframeHardwareState: IMainframeHardwareState;
  private _mainframeOwnedProgramsState: IMainframeOwnedProgramsState;
  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;

  private _processesList: ProgramName[];
  private _processesMap: Map<ProgramName, IProcess>;
  private _runningProcesses: ProgramName[];
  private _availableCores: number;
  private _availableRam: number;
  private _runningPassiveProgram?: ProgramName;

  private readonly _uiEventBatcher: EventBatcher;

  constructor(
    @inject(TYPES.ScenarioState) _scenarioState: IScenarioState,
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
    @inject(TYPES.MainframeHardwareState) _mainframeHardwareState: IMainframeHardwareState,
    @inject(TYPES.MainframeOwnedProgramsState) _mainframeOwnedProgramsState: IMainframeOwnedProgramsState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
    @inject(TYPES.Formatter) _formatter: IFormatter,
  ) {
    this._scenarioState = _scenarioState;
    this._settingsState = _settingsState;
    this._mainframeHardwareState = _mainframeHardwareState;
    this._mainframeOwnedProgramsState = _mainframeOwnedProgramsState;
    this._messageLogState = _messageLogState;
    this._formatter = _formatter;

    this._processesMap = new Map<ProgramName, IProcess>();
    this._processesList = [];
    this._runningProcesses = [];
    this._availableCores = 0;
    this._availableRam = 0;

    this._uiEventBatcher = new EventBatcher();

    this._mainframeHardwareState.addStateEventListener(
      MAINFRAME_HARDWARE_STATE_EVENTS.HARDWARE_UPDATED,
      this.updateRunningProcesses,
    );
  }

  get availableCores() {
    return this._availableCores;
  }

  get availableRam() {
    return this._availableRam;
  }

  listProcesses(): ProgramName[] {
    return this._processesList;
  }

  getProcessByName(programName: ProgramName): IProcess | undefined {
    return this._processesMap.get(programName);
  }

  addProcess(programName: ProgramName, threads: number): boolean {
    const program = this._mainframeOwnedProgramsState.getOwnedProgramByName(programName);
    if (!program) {
      return false;
    }

    if (!program.isAutoscalable && threads <= 0) {
      throw new Error('Invalid amount of threads for process');
    }

    const threadCount = program.isAutoscalable ? 0 : threads;

    const existingProcess = this.getProcessByName(programName);

    if (!program.isAutoscalable) {
      let availableRam = this.availableRam;

      if (existingProcess) {
        availableRam += existingProcess.totalRam;
      }

      if (availableRam < program.ram * threads) {
        return false;
      }
    }

    if (program.isAutoscalable && !existingProcess) {
      this.deleteAutoscalableProcesses();
    }

    if (existingProcess) {
      existingProcess.update(threads);
    } else {
      const process = this.createProcess({
        isActive: true,
        threads: threadCount,
        currentCompletionPoints: 0,
        programName: programName,
      });

      this._processesList.push(programName);
      this._processesMap.set(programName, process);
    }

    this.updateRunningProcesses();

    this._messageLogState.postMessage(ProgramsEvent.processStarted, {
      programName: program.name,
      threads: this._formatter.formatNumberDecimal(threadCount),
    });

    return true;
  }

  deleteProcess(programName: ProgramName): void {
    const process: IProcess | undefined = this.getProcessByName(programName);

    let index = 0;

    while (index < this._processesList.length) {
      if (this._processesList[index] === programName) {
        this._processesList.splice(index, 1);
      } else {
        index++;
      }
    }

    if (process) {
      process.removeEventListeners();

      this._processesMap.delete(programName);

      this._messageLogState.postMessage(ProgramsEvent.processDeleted, {
        programName,
        threads: this._formatter.formatNumberDecimal(process.threads),
      });
    }

    this.updateRunningProcesses();
  }

  calculateCompletionDelta(passedTime: number, usedCores: number): number {
    return (
      passedTime *
      usedCores *
      calculatePow(this._mainframeHardwareState.performance, this._scenarioState.currentValues.mainframeSoftware.performanceBoost)
    );
  }

  processTick() {
    if (this._runningPassiveProgram) {
      const passiveProcess = this.getProcessByName(this._runningPassiveProgram);

      if (passiveProcess?.isActive) {
        passiveProcess.program.perform(this._availableCores, this._availableRam);
      }
    }

    let hasFinishedProcesses = false;
    const completionPerCore = this.calculateCompletionDelta(this._settingsState.updateInterval, 1);

    for (const programName of this._runningProcesses) {
      const process = this.getProcessByName(programName)!;
      const completionDelta = completionPerCore * process.usedCores;
      process.increaseCompletion(completionDelta);

      if (process.currentCompletionPoints >= process.maxCompletionPoints) {
        process.program.perform(process.threads, process.totalRam);
        hasFinishedProcesses = true;
      }
    }

    if (hasFinishedProcesses) {
      this.updateFinishedProcesses();
      this.updateRunningProcesses();
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this.clearState();

    this.updateRunningProcesses();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IMainframeProcessesSerializedState): Promise<void> {
    this.clearState();

    serializedState.processes.forEach((serializedProcess) => {
      this._processesMap.set(serializedProcess.programName, this.createProcess(serializedProcess));
      this._processesList.push(serializedProcess.programName);
    });

    this.updateRunningProcesses();
  }

  serialize(): IMainframeProcessesSerializedState {
    return {
      processes: this._processesList.map((programName) => this.getProcessByName(programName)!.serialize()),
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

    for (const process of this._processesMap.values()) {
      process.fireUiEvents();
    }
  }

  private updateRunningProcesses = () => {
    this._availableCores = this._mainframeHardwareState.cores;
    this._availableRam = this._mainframeHardwareState.ram;
    this._runningProcesses.splice(0);
    this._runningPassiveProgram = this._processesList.find(
      (programName) => this.getProcessByName(programName)?.program.isAutoscalable,
    );

    let processRam = 0;
    let usedCores = 0;

    for (const programName of this._processesList) {
      const process = this.getProcessByName(programName);

      if (!process) {
        continue;
      }

      if (process.program.isAutoscalable) {
        process.usedCores = 0;
        continue;
      }

      processRam = process.totalRam;
      this._availableRam -= processRam;

      if (!process.isActive) {
        process.usedCores = 0;
        continue;
      }

      usedCores = Math.min(process.maxCores, this._availableCores);

      if (usedCores > 0) {
        process.usedCores = usedCores;
        this._runningProcesses.push(programName);
        this._availableCores -= usedCores;
      } else {
        process.usedCores = 0;
      }
    }

    this._uiEventBatcher.enqueueEvent(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED);
  };

  private updateFinishedProcesses(): void {
    let index = 0;
    let programName: ProgramName;

    while (index < this._processesList.length) {
      programName = this._processesList[index];
      const process = this.getProcessByName(programName);

      if (!process) {
        index++;
        continue;
      }

      if (!process.program.isAutoscalable && process.currentCompletionPoints >= process.maxCompletionPoints) {
        this._processesList.splice(index, 1);

        if (process.program.isRepeatable) {
          process.resetCompletion();
          this._processesList.push(programName);
        } else {
          process.removeEventListeners();
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

  private createProcess = (processParameters: ISerializedProcess): IProcess => {
    const process = new Process({
      isActive: processParameters.isActive,
      threads: processParameters.threads,
      program: this._mainframeOwnedProgramsState.getOwnedProgramByName(processParameters.programName)!,
      currentCompletionPoints: processParameters.currentCompletionPoints,
    });

    process.addStateEventListener(MAINFRAME_PROCESSES_STATE_EVENTS.PROCESS_TOGGLED, this.updateRunningProcesses);
    process.addStateEventListener(
      MAINFRAME_PROCESSES_STATE_EVENTS.PROCESS_PROGRAM_UPDATED,
      this.updateRunningProcesses,
    );

    return process;
  };

  private deleteAutoscalableProcesses(): void {
    const passiveProgram = this._runningPassiveProgram;

    this._runningPassiveProgram = undefined;

    if (passiveProgram) {
      this.deleteProcess(passiveProgram);
    }
  }

  private clearState() {
    for (const process of this._processesMap.values()) {
      process.removeEventListeners();
    }

    this._processesList = [];
    this._processesMap.clear();
  }
}
