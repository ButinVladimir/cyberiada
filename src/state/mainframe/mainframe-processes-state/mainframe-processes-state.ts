import { inject, injectable } from 'inversify';
import { ProgramName } from '@state/progam-factory/types';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import type { IMainframeProgramsState } from '@/state/mainframe/mainframe-programs-state/interfaces/mainframe-programs-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import { TYPES } from '@state/types';
import { EventBatcher } from '@shared/event-batcher';
import { ProgramsEvent } from '@shared/types';
import { moveElementInArray } from '@shared/helpers';
import {
  IMainframeProcessesSerializedState,
  IMainframeProcessesState,
  IProcess,
  ISerializedProcess,
} from './interfaces';
import { Process } from './process';
import { MAINFRAME_PROCESSES_STATE_UI_EVENTS } from './constants';

@injectable()
export class MainframeProcessesState implements IMainframeProcessesState {
  readonly uiEventBatcher: EventBatcher;

  private _stateUiConnector: IStateUIConnector;
  private _globalState: IGlobalState;
  private _settingsState: ISettingsState;
  private _mainframeHardwareState: IMainframeHardwareState;
  private _mainframeProgramsState: IMainframeProgramsState;
  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;

  private _processesList: IProcess[];
  private _processesMap: Map<ProgramName, IProcess>;
  private _runningProcesses: IProcess[];
  private _availableCores: number;
  private _availableRam: number;
  private _runningScalableProcess?: IProcess;
  private _processUpdateRequested: boolean;

  constructor(
    @inject(TYPES.StateUIConnector) _stateUiConnector: IStateUIConnector,
    @inject(TYPES.GlobalState) _globalState: IGlobalState,
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
    @inject(TYPES.MainframeHardwareState) _mainframeHardwareState: IMainframeHardwareState,
    @inject(TYPES.MainframeProgramsState) _mainframeProgramsState: IMainframeProgramsState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
    @inject(TYPES.Formatter) _formatter: IFormatter,
  ) {
    this._stateUiConnector = _stateUiConnector;
    this._globalState = _globalState;
    this._settingsState = _settingsState;
    this._mainframeHardwareState = _mainframeHardwareState;
    this._mainframeProgramsState = _mainframeProgramsState;
    this._messageLogState = _messageLogState;
    this._formatter = _formatter;

    this._processesMap = new Map<ProgramName, IProcess>();
    this._processesList = [];
    this._runningProcesses = [];
    this._availableCores = 0;
    this._availableRam = 0;
    this._processUpdateRequested = false;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get availableCores() {
    this._stateUiConnector.connectEventHandler(this, MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED);

    return this._availableCores;
  }

  get availableRam() {
    this._stateUiConnector.connectEventHandler(this, MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED);

    return this._availableRam;
  }

  get runningScalableProcess() {
    this._stateUiConnector.connectEventHandler(this, MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED);

    return this._runningScalableProcess;
  }

  listProcesses(): IProcess[] {
    this._stateUiConnector.connectEventHandler(this, MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED);

    return this._processesList;
  }

  getProcessByName(programName: ProgramName): IProcess | undefined {
    return this._processesMap.get(programName);
  }

  addProcess(programName: ProgramName, threads: number): boolean {
    const program = this._mainframeProgramsState.getOwnedProgramByName(programName);
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

      if (program.isAutoscalable) {
        this._processesList.unshift(process);
      } else {
        this._processesList.push(process);
      }

      this._processesMap.set(programName, process);
    }

    this.requestUpdateProcesses();

    this._messageLogState.postMessage(ProgramsEvent.processStarted, {
      programName: program.name,
      threads: this._formatter.formatNumberDecimal(threadCount),
    });

    return true;
  }

  toggleAllProcesses(active: boolean): void {
    for (const process of this._processesMap.values()) {
      process.toggleActive(active);
    }

    this.requestUpdateProcesses();
  }

  deleteProcess(programName: ProgramName): void {
    const process: IProcess | undefined = this.getProcessByName(programName);

    let index = 0;

    while (index < this._processesList.length) {
      if (this._processesList[index].program.name === programName) {
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

    this.requestUpdateProcesses();
  }

  deleteAllProcesses() {
    this.clearState();

    this._messageLogState.postMessage(ProgramsEvent.allProcessesDeleted);

    this.requestUpdateProcesses();
  }

  requestUpdateProcesses() {
    this._processUpdateRequested = true;
  }

  processTick() {
    if (this._processUpdateRequested) {
      this.updateRunningProcesses();
    }

    if (this._runningScalableProcess?.isActive) {
      this._runningScalableProcess.program.perform(this._availableCores, this._availableRam);
    }

    let hasFinishedProcesses = false;

    for (const process of this._runningProcesses) {
      process.increaseCompletion(process.calculateCompletionDelta(this._settingsState.updateInterval));

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

  moveProcess(programName: ProgramName, newPosition: number) {
    const oldPosition = this._processesList.findIndex((process) => process.program.name === programName);

    if (oldPosition === -1) {
      return;
    }

    moveElementInArray(this._processesList, oldPosition, newPosition);

    this.requestUpdateProcesses();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this.clearState();

    this.requestUpdateProcesses();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IMainframeProcessesSerializedState): Promise<void> {
    this.clearState();

    serializedState.processes.forEach((serializedProcess) => {
      const process = this.createProcess(serializedProcess);
      this._processesMap.set(serializedProcess.programName, process);
      this._processesList.push(process);
    });

    this.requestUpdateProcesses();
  }

  serialize(): IMainframeProcessesSerializedState {
    return {
      processes: this._processesList.map((process) => process.serialize()),
    };
  }

  private updateRunningProcesses = () => {
    this._processUpdateRequested = false;
    this._availableCores = this._mainframeHardwareState.cores.level;
    this._availableRam = this._mainframeHardwareState.ram.level;
    this._runningProcesses.splice(0);
    this._runningScalableProcess = this._processesList.find((process) => process.program.isAutoscalable);

    let processRam = 0;
    let usedCores = 0;

    for (const process of this._processesList) {
      if (process.program.isAutoscalable) {
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
        this._runningProcesses.push(process);
        this._availableCores -= usedCores;
      } else {
        process.usedCores = 0;
      }
    }

    if (this._runningScalableProcess) {
      this._runningScalableProcess.usedCores = this._runningScalableProcess.isActive ? this._availableCores : 0;
    }

    this._globalState.requestGrowthRecalculation();

    this.uiEventBatcher.enqueueEvent(MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED);
  };

  private updateFinishedProcesses(): void {
    let index = 0;

    while (index < this._processesList.length) {
      const process = this._processesList[index];

      if (!process.program.isAutoscalable && process.currentCompletionPoints >= process.maxCompletionPoints) {
        this._processesList.splice(index, 1);

        if (process.program.isRepeatable) {
          process.resetCompletion();
          this._processesList.push(process);
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
      mainframeProcessesState: this,
      stateUiConnector: this._stateUiConnector,
      isActive: processParameters.isActive,
      threads: processParameters.threads,
      program: this._mainframeProgramsState.getOwnedProgramByName(processParameters.programName)!,
      currentCompletionPoints: processParameters.currentCompletionPoints,
    });

    return process;
  };

  private deleteAutoscalableProcesses(): void {
    const scalableProgram = this._runningScalableProcess;

    this._runningScalableProcess = undefined;

    if (scalableProgram) {
      this.deleteProcess(scalableProgram.program.name);
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
