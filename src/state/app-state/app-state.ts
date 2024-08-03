import { inject, injectable } from 'inversify';
import { EventEmitter } from 'eventemitter3';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { ICityState } from '@state/city-state/interfaces/city-state';
import { TYPES } from '@state/types';
import { IAppState, ISerializedState } from './interfaces';
import { LOCAL_STORAGE_KEY, APP_EVENTS } from './constants';

@injectable()
export class AppState implements IAppState {
  private _generalState: IGeneralState;
  private _settingsState: ISettingsState;
  private _cityState: ICityState;

  private readonly _eventEmitter: EventEmitter;

  constructor(
    @inject(TYPES.GeneralState) _generalState: IGeneralState,
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
    @inject(TYPES.CityState) _cityState: ICityState,
  ) {
    this._generalState = _generalState;
    this._settingsState = _settingsState;
    this._cityState = _cityState;

    this._eventEmitter = new EventEmitter();
  }

  async startUp(): Promise<void> {
    const saveData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (saveData) {
      try {
        const parsedSaveData = JSON.parse(atob(saveData)) as ISerializedState;

        await this.loadState(parsedSaveData);
      } catch (e) {
        console.error(e);
        await this.startNewState();
      }
    } else {
      await this.startNewState();
    }

    this.startRunningGame();
  }

  saveGame(): void {
    const encodedSaveData = this.buildSaveData();
    localStorage.setItem(LOCAL_STORAGE_KEY, encodedSaveData);
  }

  addUiEventListener(eventName: symbol, handler: () => void): void {
    this._eventEmitter.addListener(eventName, handler);
  }

  removeUiEventListener(eventName: symbol, handler: () => void): void {
    this._eventEmitter.removeListener(eventName, handler);
  }

  importSavefile(file: File): void {
    this.startLoadingGame();

    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, fileReader.result as string);
      this.startUp().catch((e) => {
        console.error(e);
      });
    });

    fileReader.addEventListener('error', () => {
      console.error(`An error occurred during importing file ${file.name}`);
      this.startRunningGame();
    });

    fileReader.readAsText(file);
  }

  exportSavefile(): void {
    const saveData = this.buildSaveData();
    const savefileName = `cyberiada-savefile-${new Date().toLocaleString()}.txt`;

    const file = new File([saveData], savefileName, { endings: 'transparent' });

    const linkElement = document.createElement('a');
    linkElement.download = savefileName;
    linkElement.href = URL.createObjectURL(file);
    linkElement.click();
    URL.revokeObjectURL(linkElement.href);
  }

  deleteSaveData(): void {
    this.startLoadingGame();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    this.startUp().catch((e) => {
      console.error(e);
    });
  }

  private buildSaveData(): string {
    const saveState: ISerializedState = {
      general: this._generalState.serialize(),
      settings: this._settingsState.serialize(),
      city: this._cityState.serialize(),
    };

    const encodedSaveState = btoa(JSON.stringify(saveState));

    return encodedSaveState;
  }

  private async startNewState(): Promise<void> {
    this._generalState.startNewState();
    await this._settingsState.startNewState();
    await this._cityState.startNewState();
    this.saveGame();
  }

  private async loadState(saveData: ISerializedState): Promise<void> {
    this._generalState.deserialize(saveData.general);
    await this._settingsState.deserialize(saveData.settings);
    this._cityState.deserialize(saveData.city);
  }

  private startLoadingGame = (): void => {
    this._generalState.startLoadingGame();
    this._eventEmitter.emit(APP_EVENTS.CHANGED_GAME_STATE);
  };

  private startRunningGame = (): void => {
    this._generalState.startRunningGame();
    this._eventEmitter.emit(APP_EVENTS.CHANGED_GAME_STATE);
  };
}
