import { inject, injectable } from 'inversify';
import type { IAppState } from '@state/app-state/interfaces/app-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces';
import { TYPES } from '@state/types';
import { EventBatcher } from '@shared/event-batcher';
import { GameStateEvent } from '@shared/types';
import { IApp } from './interfaces';
import { LOCAL_STORAGE_KEY, APP_UI_EVENTS } from './constants';
import { AppStage } from './types';

@injectable()
export class App implements IApp {
  private _appState: IAppState;
  private _messageLogState: IMessageLogState;
  private _appStage: AppStage;
  private readonly _uiEventBatcher: EventBatcher;

  constructor(
    @inject(TYPES.AppState) _appState: IAppState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
  ) {
    this._appState = _appState;
    this._messageLogState = _messageLogState;
    this._appStage = AppStage.loading;

    this._uiEventBatcher = new EventBatcher();
  }

  get appStage() {
    return this._appStage;
  }

  async startUp(): Promise<void> {
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

  saveGame(): void {
    const encodedSaveData = this._appState.serialize();

    localStorage.setItem(LOCAL_STORAGE_KEY, encodedSaveData);
    this._messageLogState.postMessage(GameStateEvent.gameSaved);
  }

  addUiEventListener(eventName: symbol, handler: () => void): void {
    this._uiEventBatcher.addListener(eventName, handler);
  }

  removeUiEventListener(eventName: symbol, handler: () => void): void {
    this._uiEventBatcher.removeListener(eventName, handler);
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

  private startLoadingGame = (): void => {
    this._appStage = AppStage.loading;
    this._uiEventBatcher.enqueueEvent(APP_UI_EVENTS.CHANGED_APP_STAGE);
    this._uiEventBatcher.fireEvents();
  };

  private startRunningGame = (): void => {
    this._appStage = AppStage.running;
    this._messageLogState.clearMessages();
    this._messageLogState.postMessage(GameStateEvent.gameStarted);

    this._uiEventBatcher.enqueueEvent(APP_UI_EVENTS.CHANGED_APP_STAGE);
    this._uiEventBatcher.fireEvents();
  };
}
