import { EventEmitter } from 'eventemitter3';
import { GeneralState } from '@state/general-state/general-state';
import { SettingsState } from '@state/settings-state/settings-state';
import { IAppState, IStoredState } from "./interfaces";
import { LOCAL_STORAGE_KEY, LOADING_TIME, APP_EVENTS } from './constants';

export class AppState implements IAppState {
  private static _instance: AppState | undefined = undefined;

  private _generalState: GeneralState;
  private _settingsState: SettingsState;
  private readonly _eventEmitter: EventEmitter;

  static get instance(): IAppState {
    if (!AppState._instance) {
      AppState._instance = new AppState();
    }

    return AppState._instance;
  }

  private constructor() {
    this._eventEmitter = new EventEmitter();

    this._generalState = new GeneralState(this);
    this._settingsState = new SettingsState(this);
  }

  get generalState(): GeneralState {
    return this._generalState;
  }

  get settingsState(): SettingsState {
    return this._settingsState;
  }

  async startUp(): Promise<void> {
    const saveData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (saveData) {
      try {
        const parsedSaveData = JSON.parse(atob(saveData)) as IStoredState;

        await this.loadState(parsedSaveData);
      } catch(e) {
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

  on(eventName: symbol, handler: () => void): void {
    this._eventEmitter.addListener(eventName, handler);
  }

  off(eventName: symbol, handler: () => void): void {
    this._eventEmitter.removeListener(eventName, handler);
  }

  importSavefile(file: File): void {
    this.startLoadingGame();

    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, fileReader.result as string);
      this.startUp().catch((e) => { console.error(e); });
    });

    fileReader.addEventListener("error", () => {
      console.log(`An event occurred during importing file ${file.name}`);
      this.startRunningGame();
    });

    fileReader.readAsText(file);
  }

  exportSavefile(): void {
    const saveData = this.buildSaveData();
    const savefileName = `cyberiada-savefile-${(new Date().toLocaleString())}.txt`;

    const file = new File(
      [saveData],
      savefileName,
      { endings: 'transparent' },
    );

    const linkElement = document.createElement('a');
    linkElement.download = savefileName;
    linkElement.href = URL.createObjectURL(file);
    linkElement.click();
    URL.revokeObjectURL(linkElement.href);
  }

  deleteSaveData(): void {
    this.startLoadingGame();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    this.startUp().catch((e) => { console.error(e); });
  }

  private buildSaveData(): string {
    const saveState: IStoredState = {
      settings: this.settingsState.buildSaveState(),
    };

    const encodedSaveState = btoa(JSON.stringify(saveState));

    return encodedSaveState;
  }

  private async startNewState(): Promise<void> {
    await this.settingsState.startNewState();
  }

  private async loadState(saveData: IStoredState): Promise<void> {
    await this.settingsState.loadState(saveData.settings);
  }

  private startLoadingGame = (): void => {
    this.generalState.startLoadingGame();
    this._eventEmitter.emit(APP_EVENTS.CHANGED_GAME_STATE);
  };

  private startRunningGame = (): void => {
    setTimeout(() => {
      this.generalState.startRunningGame();
      this._eventEmitter.emit(APP_EVENTS.CHANGED_GAME_STATE); 
    }, LOADING_TIME);
  };
}