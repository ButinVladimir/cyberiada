export interface IAppState {
  startUp(): Promise<void>;
  saveGame(): void;
  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void): void;
  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void): void;
  importSavefile(file: File): void;
  exportSavefile(): void;
  deleteSaveData(): void;
}
