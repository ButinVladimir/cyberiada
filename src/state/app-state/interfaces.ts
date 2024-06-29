import { IGeneralState } from '@state/general-state/interfaces';
import { ISettingsState, ISettingsStoredState } from '@state/settings-state/interfaces';

export interface IAppState {
  generalState: IGeneralState;
  settingsState: ISettingsState;
  startUp(): Promise<void>;
  saveGame(): void;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  on(eventName: symbol, handler: (...args: any[]) => void): void;
  off(eventName: symbol, handler: (...args: any[]) => void): void;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  importSavefile(file: File): void;
  exportSavefile(): void;
  deleteSaveData(): void;
}

export interface IStoredState {
  settings: ISettingsStoredState;
}