import { AppStage } from '../types';

export interface IApp {
  appStage: AppStage;
  startUp(): Promise<void>;
  saveGame(): void;
  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void): void;
  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void): void;
  importSavefile(file: File): void;
  exportSavefile(): void;
  deleteSaveData(): Promise<void>;
}
