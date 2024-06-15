import { EventEmitter } from 'eventemitter3';
import { IGeneralState } from '@state/general-state/interfaces';
import { ISettingsState, ISettingsStoredState } from '@state/settings-state/interfaces';

export interface IAppState {
  eventEmitter: EventEmitter;
  generalState: IGeneralState;
  settingsState: ISettingsState;
  startGame(): Promise<void>;
  saveGame(): void;
}

export interface IStoredState {
  settings: ISettingsStoredState;
}
