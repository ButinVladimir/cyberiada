import { inject, injectable } from 'inversify';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import type { IGrowthState } from '@state/growth-state/interfaces/growth-state';
import { GameSpeed } from '@state/general-state/types';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { ICityState } from '@state/city-state/interfaces/city-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import type { IMainframeOwnedProgramsState } from '@state/mainframe/mainframe-owned-programs-state/interfaces/mainframe-owned-program-state';
import type { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import type { IProgramFactory } from '@state/progam-factory/interfaces/program-factory';
import { TYPES } from '@state/types';
import { IAppState, ISerializedState } from './interfaces';

@injectable()
export class AppState implements IAppState {
  private _scenarioState: IScenarioState;
  private _generalState: IGeneralState;
  private _growthState: IGrowthState;
  private _settingsState: ISettingsState;
  private _cityState: ICityState;
  private _messageLogState: IMessageLogState;
  private _mainframeHardwareState: IMainframeHardwareState;
  private _mainframeOwnedProgramsState: IMainframeOwnedProgramsState;
  private _mainframeProcessesState: IMainframeProcessesState;
  private _programFactory: IProgramFactory;

  constructor(
    @inject(TYPES.ScenarioState) _scenarioState: IScenarioState,
    @inject(TYPES.GeneralState) _generalState: IGeneralState,
    @inject(TYPES.GrowthState) _growthState: IGrowthState,
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
    @inject(TYPES.CityState) _cityState: ICityState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
    @inject(TYPES.MainframeHardwareState) _mainframeHardwareState: IMainframeHardwareState,
    @inject(TYPES.MainframeOwnedProgramsState) _mainframeOwnedProgramsState: IMainframeOwnedProgramsState,
    @inject(TYPES.MainframeProcessesState) _mainframeProcessesState: IMainframeProcessesState,
    @inject(TYPES.ProgramFactory) _programFactory: IProgramFactory,
  ) {
    this._scenarioState = _scenarioState;
    this._generalState = _generalState;
    this._growthState = _growthState;
    this._settingsState = _settingsState;
    this._cityState = _cityState;
    this._messageLogState = _messageLogState;
    this._mainframeHardwareState = _mainframeHardwareState;
    this._mainframeOwnedProgramsState = _mainframeOwnedProgramsState;
    this._mainframeProcessesState = _mainframeProcessesState;
    this._programFactory = _programFactory;
  }

  updateState() {
    this._generalState.updateLastUpdateTime();

    let maxTicks = 0;

    switch (this._generalState.gameSpeed) {
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

    for (let tick = 0; tick < maxTicks && this._generalState.decreaseOfflineTimeByTick(); tick++) {
      this.processTick();
    }
  }

  private processTick = () => {
    this._generalState.increaseTime();
    this._mainframeProcessesState.processTick();
  };

  async startNewState(): Promise<void> {
    this._programFactory.deleteAllPrograms();

    await this._scenarioState.startNewState();
    await this._generalState.startNewState();
    await this._settingsState.startNewState();
    await this._cityState.startNewState();
    await this._mainframeHardwareState.startNewState();
    await this._mainframeOwnedProgramsState.startNewState();
    await this._mainframeProcessesState.startNewState();

    this._growthState.recalculate();
  }

  serialize(): string {
    const saveState: ISerializedState = {
      scenario: this._scenarioState.serialize(),
      general: this._generalState.serialize(),
      settings: this._settingsState.serialize(),
      city: this._cityState.serialize(),
      mainframeHardware: this._mainframeHardwareState.serialize(),
      mainframeOwnedPrograms: this._mainframeOwnedProgramsState.serialize(),
      mainframeProcesses: this._mainframeProcessesState.serialize(),
    };

    const encodedSaveState = btoa(JSON.stringify(saveState));

    return encodedSaveState;
  }

  async deserialize(saveData: string): Promise<void> {
    const parsedSaveData = JSON.parse(atob(saveData)) as ISerializedState;

    this._programFactory.deleteAllPrograms();

    await this._scenarioState.deserialize(parsedSaveData.scenario);
    await this._generalState.deserialize(parsedSaveData.general);
    await this._settingsState.deserialize(parsedSaveData.settings);
    await this._cityState.deserialize(parsedSaveData.city);
    await this._mainframeHardwareState.deserialize(parsedSaveData.mainframeHardware);
    await this._mainframeOwnedProgramsState.deserialize(parsedSaveData.mainframeOwnedPrograms);
    await this._mainframeProcessesState.deserialize(parsedSaveData.mainframeProcesses);

    this._growthState.recalculate();
  }

  addUiEventListener() {}

  removeUiEventListener() {}

  fireUiEvents() {
    this._generalState.fireUiEvents();
    this._growthState.fireUiEvents();
    this._messageLogState.fireUiEvents();
    this._mainframeHardwareState.fireUiEvents();
    this._mainframeOwnedProgramsState.fireUiEvents();
    this._mainframeProcessesState.fireUiEvents();
    this._programFactory.fireUiEvents();
  }
}
