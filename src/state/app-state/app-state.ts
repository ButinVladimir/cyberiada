import { inject, injectable } from 'inversify';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import { GameSpeed } from '@state/general-state/types';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { ICityState } from '@state/city-state/interfaces/city-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { TYPES } from '@state/types';
import { GameStateEvent } from '@shared/types';
import { IAppState, ISerializedState } from './interfaces';

@injectable()
export class AppState implements IAppState {
  private _generalState: IGeneralState;
  private _settingsState: ISettingsState;
  private _cityState: ICityState;
  private _messageLogState: IMessageLogState;
  private _mainframeState: IMainframeState;

  constructor(
    @inject(TYPES.GeneralState) _generalState: IGeneralState,
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
    @inject(TYPES.CityState) _cityState: ICityState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
    @inject(TYPES.MainframeState) _mainframeState: IMainframeState,
  ) {
    this._generalState = _generalState;
    this._settingsState = _settingsState;
    this._cityState = _cityState;
    this._messageLogState = _messageLogState;
    this._mainframeState = _mainframeState;
  }

  updateState() {
    this._generalState.updateLastUpdateTime();

    let updatedTicks = 0;
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

    for (let tick = 0; tick < maxTicks && this._generalState.decreaseBonusTimeByTick(); tick++) {
      updatedTicks++;
    }

    this._messageLogState.postMessage(GameStateEvent.gameStateUpdated, { count: updatedTicks });
  }

  async startNewState(): Promise<void> {
    await this._generalState.startNewState();
    await this._settingsState.startNewState();
    await this._cityState.startNewState();
    await this._mainframeState.startNewState();
  }

  serialize(): string {
    const saveState: ISerializedState = {
      general: this._generalState.serialize(),
      settings: this._settingsState.serialize(),
      city: this._cityState.serialize(),
      mainframe: this._mainframeState.serialize(),
    };

    const encodedSaveState = btoa(JSON.stringify(saveState));

    return encodedSaveState;
  }

  async deserialize(saveData: string): Promise<void> {
    const parsedSaveData = JSON.parse(atob(saveData)) as ISerializedState;

    await this._generalState.deserialize(parsedSaveData.general);
    await this._settingsState.deserialize(parsedSaveData.settings);
    await this._cityState.deserialize(parsedSaveData.city);
    await this._mainframeState.deserialize(parsedSaveData.mainframe);
  }

  addUiEventListener() {}

  removeUiEventListener() {}

  fireUiEvents() {
    this._generalState.fireUiEvents();
    this._messageLogState.fireUiEvents();
  }
}
