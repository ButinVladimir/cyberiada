import { EventEmitter } from 'eventemitter3';
import { GeneralState } from '@state/general-state/general-state';
import { SettingsState } from '@state/settings-state/settings-state';
import { IAppState, IStoredState } from "./interfaces";
import { LOCAL_STORAGE_KEY, LOADING_TIME } from './constants';

export class AppState implements IAppState {
  private static _instance: AppState | undefined = undefined;

  private _generalState: GeneralState;
  private _settingsState: SettingsState;
  public readonly eventEmitter: EventEmitter;

  static get instance(): AppState {
    if (!AppState._instance) {
      AppState._instance = new AppState();
    }

    return AppState._instance;
  }

  private constructor() {
    this.eventEmitter = new EventEmitter();

    this._generalState = new GeneralState(this);
    this._settingsState = new SettingsState(this);
  }

  get generalState(): GeneralState {
    return this._generalState;
  }

  get settingsState(): SettingsState {
    return this._settingsState;
  }

  async startGame(): Promise<void> {
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

    setTimeout(this.generalState.startRunningGame, LOADING_TIME);
  }

  saveGame(): void {
    const saveData: IStoredState = this.buildSaveState();

    const encodedSaveData = btoa(JSON.stringify(saveData));
    localStorage.setItem(LOCAL_STORAGE_KEY, encodedSaveData);
  }

  private buildSaveState(): IStoredState {
    return {
      settings: this.settingsState.buildSaveState(),
    };
  }

  private async loadState(saveData: IStoredState): Promise<void> {
    await this.settingsState.loadState(saveData.settings);
  }

  private async startNewState(): Promise<void> {
    await this.settingsState.startNewState();
  }
}