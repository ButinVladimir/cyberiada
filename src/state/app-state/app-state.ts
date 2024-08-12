import { inject, injectable } from 'inversify';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import { GameSpeed } from '@state/general-state/types';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { ICityState } from '@state/city-state/interfaces/city-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { TYPES } from '@state/types';
import { GameStateEvent } from '@shared/types';
import { IAppState, ISerializedState } from './interfaces';

@injectable()
export class AppState implements IAppState {
  private _generalState: IGeneralState;
  private _settingsState: ISettingsState;
  private _cityState: ICityState;
  private _messageLogState: IMessageLogState;

  constructor(
    @inject(TYPES.GeneralState) _generalState: IGeneralState,
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
    @inject(TYPES.CityState) _cityState: ICityState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
  ) {
    this._generalState = _generalState;
    this._settingsState = _settingsState;
    this._cityState = _cityState;
    this._messageLogState = _messageLogState;
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
    this._generalState.startNewState();
    await this._settingsState.startNewState();
    await this._cityState.startNewState();
  }

  serialize(): string {
    const saveState: ISerializedState = {
      general: this._generalState.serialize(),
      settings: this._settingsState.serialize(),
      city: this._cityState.serialize(),
    };

    const encodedSaveState = btoa(JSON.stringify(saveState));

    return encodedSaveState;
  }

  async deserialize(saveData: string): Promise<void> {
    const parsedSaveData = JSON.parse(atob(saveData)) as ISerializedState;

    this._generalState.deserialize(parsedSaveData.general);
    await this._settingsState.deserialize(parsedSaveData.settings);
    this._cityState.deserialize(parsedSaveData.city);
  }

  fireUiEvents() {
    this._generalState.fireUiEvents();
    this._messageLogState.fireUiEvents();
  }
}
