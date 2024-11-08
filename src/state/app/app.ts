import { inject, injectable } from 'inversify';
import type { IAppState } from '@state/app-state/interfaces/app-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { TYPES } from '@state/types';
import { EventBatcher } from '@shared/event-batcher';
import { GameStateEvent } from '@shared/types';
import { IApp } from './interfaces';
import { LOCAL_STORAGE_KEY, APP_UI_EVENTS } from './constants';
import { AppStage } from './types';

@injectable()
export class App implements IApp {
  private _appState: IAppState;
  private _settingsState: ISettingsState;
  private _messageLogState: IMessageLogState;
  private _appStage: AppStage;
  private _updateTimer?: NodeJS.Timeout;
  private _autosaveTimer?: NodeJS.Timeout;
  private readonly _uiEventBatcher: EventBatcher;

  constructor(
    @inject(TYPES.AppState) _appState: IAppState,
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
  ) {
    this._appState = _appState;
    this._settingsState = _settingsState;
    this._messageLogState = _messageLogState;
    this._appStage = AppStage.loading;
    this._updateTimer = undefined;
    this._autosaveTimer = undefined;

    this._uiEventBatcher = new EventBatcher();
  }

  get appStage() {
    return this._appStage;
  }

  async startUp(): Promise<void> {
    this.startLoadingGame();

    const saveData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (saveData) {
      try {
        await this._appState.deserialize(saveData);
      } catch (e) {
        console.error(e);
        await this._appState.startNewState();
      }
    } else {
      await this._appState.startNewState();
    }

    this.startRunningGame();
  }

  saveGame = (): void => {
    const encodedSaveData = this._appState.serialize();

    localStorage.setItem(LOCAL_STORAGE_KEY, encodedSaveData);
    this._messageLogState.postMessage(GameStateEvent.gameSaved);
  };

  addUiEventListener(eventName: symbol, handler: () => void): void {
    this._uiEventBatcher.addListener(eventName, handler);
  }

  removeUiEventListener(eventName: symbol, handler: () => void): void {
    this._uiEventBatcher.removeListener(eventName, handler);
  }

  fireUiEvents() {
    this._uiEventBatcher.fireEvents();
    this._appState.fireUiEvents();
  }

  importSavefile(file: File): void {
    this.startLoadingGame();

    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => {
      this._appState
        .deserialize(fileReader.result as string)
        .then(() => {
          this.startRunningGame();
        })
        .catch((e) => {
          console.error(e);

          return this._appState.startNewState();
        });
    });

    fileReader.addEventListener('error', () => {
      console.error(`An error occurred during importing file ${file.name}`);
      this.startRunningGame();
    });

    fileReader.readAsText(file);
  }

  exportSavefile(): void {
    const saveData = this._appState.serialize();
    const savefileName = `cyberiada-savefile-${new Date().toLocaleString()}.txt`;

    const file = new File([saveData], savefileName, { endings: 'transparent' });

    const linkElement = document.createElement('a');
    linkElement.download = savefileName;
    linkElement.href = URL.createObjectURL(file);
    linkElement.click();
    URL.revokeObjectURL(linkElement.href);
  }

  async deleteSaveData(): Promise<void> {
    this.startLoadingGame();

    localStorage.removeItem(LOCAL_STORAGE_KEY);

    try {
      await this.startUp();
    } catch (e) {
      console.error(e);
    }
  }

  restartUpdateTimer() {
    this.stopUpdateTimer();
    this._updateTimer = setInterval(this.updateGame, this._settingsState.updateInterval);
  }

  restartAutosaveTimer() {
    this.stopAutosaveTimer();

    if (this._settingsState.autosaveEnabled) {
      this._autosaveTimer = setInterval(this.saveGame, this._settingsState.autosaveInterval);
    }
  }

  fastForward() {
    this._appStage = AppStage.fastForward;

    this.emitChangedAppStageEvent();
  }

  stopFastForwarding() {
    this._appStage = AppStage.running;
    this._messageLogState.postMessage(GameStateEvent.fastForwared);
    this.emitChangedAppStageEvent();
  }

  private startLoadingGame = (): void => {
    this._appStage = AppStage.loading;

    this.stopUpdateTimer();
    this.stopAutosaveTimer();

    this.emitChangedAppStageEvent();
  };

  private startRunningGame = (): void => {
    this._appStage = AppStage.running;

    this.restartUpdateTimer();
    this.restartAutosaveTimer();

    this._messageLogState.clearMessages();
    this._messageLogState.postMessage(GameStateEvent.gameStarted);

    this.emitChangedAppStageEvent();
  };

  private emitChangedAppStageEvent() {
    this._uiEventBatcher.enqueueEvent(APP_UI_EVENTS.CHANGED_APP_STAGE);
    this.fireUiEvents();
  }

  private stopUpdateTimer() {
    if (this._updateTimer) {
      clearInterval(this._updateTimer);
    }

    this._updateTimer = undefined;
  }

  private stopAutosaveTimer() {
    if (this._autosaveTimer) {
      clearInterval(this._autosaveTimer);
    }

    this._autosaveTimer = undefined;
  }

  private updateGame = (): void => {
    switch (this.appStage) {
      case AppStage.running:
        this._appState.updateState();
        break;

      case AppStage.fastForward:
        if (!this._appState.fastForwardState()) {
          this._appStage = AppStage.running;
          this._messageLogState.postMessage(GameStateEvent.fastForwared);
          this._uiEventBatcher.enqueueEvent(APP_UI_EVENTS.CHANGED_APP_STAGE);
        }
        break;
    }

    this._uiEventBatcher.enqueueEvent(APP_UI_EVENTS.REFRESHED_UI);
    this.fireUiEvents();
  };
}
