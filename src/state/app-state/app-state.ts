import { inject, injectable } from 'inversify';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { ICityState } from '@state/city-state/interfaces/city-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import type { IMainframeOwnedProgramsState } from '@state/mainframe/mainframe-owned-programs-state/interfaces/mainframe-owned-program-state';
import type { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import type { IProgramFactory } from '@state/progam-factory/interfaces/program-factory';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMainframeHardwareAutomationState } from '@state/automation/mainframe-hardware-automation-state/interfaces/mainframe-hardware-automation-state';
import { GameSpeed } from '@state/global-state/types';
import { TYPES } from '@state/types';
import { IAppState, ISerializedState } from './interfaces';

@injectable()
export class AppState implements IAppState {
  private _scenarioState: IScenarioState;
  private _globalState: IGlobalState;
  private _settingsState: ISettingsState;
  private _cityState: ICityState;
  private _messageLogState: IMessageLogState;
  private _mainframeHardwareState: IMainframeHardwareState;
  private _mainframeOwnedProgramsState: IMainframeOwnedProgramsState;
  private _mainframeProcessesState: IMainframeProcessesState;
  private _programFactory: IProgramFactory;
  private _mainframeHardwareAutomationState: IMainframeHardwareAutomationState;

  constructor(
    @inject(TYPES.ScenarioState) _scenarioState: IScenarioState,
    @inject(TYPES.GlobalState) _globalState: IGlobalState,
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
    @inject(TYPES.CityState) _cityState: ICityState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
    @inject(TYPES.MainframeHardwareState) _mainframeHardwareState: IMainframeHardwareState,
    @inject(TYPES.MainframeOwnedProgramsState) _mainframeOwnedProgramsState: IMainframeOwnedProgramsState,
    @inject(TYPES.MainframeProcessesState) _mainframeProcessesState: IMainframeProcessesState,
    @inject(TYPES.ProgramFactory) _programFactory: IProgramFactory,
    @inject(TYPES.MainframeHardwareAutomationState)
    _mainframeHardwareAutomationState: IMainframeHardwareAutomationState,
  ) {
    this._scenarioState = _scenarioState;
    this._globalState = _globalState;
    this._settingsState = _settingsState;
    this._cityState = _cityState;
    this._messageLogState = _messageLogState;
    this._mainframeHardwareState = _mainframeHardwareState;
    this._mainframeOwnedProgramsState = _mainframeOwnedProgramsState;
    this._mainframeProcessesState = _mainframeProcessesState;
    this._programFactory = _programFactory;
    this._mainframeHardwareAutomationState = _mainframeHardwareAutomationState;
  }

  updateState() {
    let maxTicks = 0;

    switch (this._globalState.gameSpeed) {
      case GameSpeed.paused:
        maxTicks = 0;
        break;
      case GameSpeed.normal:
        maxTicks = 1;
        break;
      case GameSpeed.fast:
        maxTicks = this._settingsState.maxTicksPerUpdate;
        break;
    }

    this.processTicks(maxTicks);
  }

  fastForwardState(): boolean {
    const maxTicks = this._settingsState.maxTicksPerFastForward;

    const ticksProcessed = this.processTicks(maxTicks);

    return ticksProcessed === maxTicks;
  }

  serialize(): string {
    const saveState: ISerializedState = {
      scenario: this._scenarioState.serialize(),
      global: this._globalState.serialize(),
      settings: this._settingsState.serialize(),
      city: this._cityState.serialize(),
      mainframeHardware: this._mainframeHardwareState.serialize(),
      mainframeOwnedPrograms: this._mainframeOwnedProgramsState.serialize(),
      mainframeProcesses: this._mainframeProcessesState.serialize(),
      mainframeHardwareAutomationState: this._mainframeHardwareAutomationState.serialize(),
    };

    const encodedSaveState = btoa(JSON.stringify(saveState));

    return encodedSaveState;
  }

  async deserialize(saveData: string): Promise<void> {
    const parsedSaveData = JSON.parse(atob(saveData)) as ISerializedState;

    this._programFactory.deleteAllPrograms();

    await this._scenarioState.deserialize(parsedSaveData.scenario);
    await this._globalState.deserialize(parsedSaveData.global);
    await this._settingsState.deserialize(parsedSaveData.settings);
    await this._cityState.deserialize(parsedSaveData.city);
    await this._mainframeHardwareState.deserialize(parsedSaveData.mainframeHardware);
    await this._mainframeOwnedProgramsState.deserialize(parsedSaveData.mainframeOwnedPrograms);
    await this._mainframeProcessesState.deserialize(parsedSaveData.mainframeProcesses);
    await this._mainframeHardwareAutomationState.deserialize(parsedSaveData.mainframeHardwareAutomationState);
  }

  addUiEventListener() {}

  removeUiEventListener() {}

  fireUiEvents() {
    this._globalState.fireUiEvents();
    this._messageLogState.fireUiEvents();
    this._mainframeHardwareState.fireUiEvents();
    this._mainframeOwnedProgramsState.fireUiEvents();
    this._mainframeProcessesState.fireUiEvents();
    this._programFactory.fireUiEvents();
  }

  private processTicks(maxTicks: number): number {
    let ticksProcessed = 0;

    this._globalState.time.updateLastUpdateTime();

    for (; ticksProcessed < maxTicks && this._globalState.time.tryNextTick(); ticksProcessed++) {
      this.processSingleTick();
    }

    return ticksProcessed;
  }

  private processSingleTick = () => {
    this._mainframeProcessesState.processTick();
    this._globalState.recalculate();
  };

  async startNewState(): Promise<void> {
    this._programFactory.deleteAllPrograms();

    await this._scenarioState.startNewState();
    await this._globalState.startNewState();
    await this._settingsState.startNewState();
    await this._cityState.startNewState();
    await this._mainframeHardwareState.startNewState();
    await this._mainframeOwnedProgramsState.startNewState();
    await this._mainframeProcessesState.startNewState();
    await this._mainframeHardwareAutomationState.startNewState();
  }
}
