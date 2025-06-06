import { AppStage } from '../types';

export interface IApp {
  appStage: AppStage;
  startUp(): Promise<void>;
  saveGame(): void;
  refreshUI(): void;
  importSavefile(file: File): void;
  exportSavefile(): void;
  deleteSaveData(): Promise<void>;
  restartUpdateTimer(): void;
  restartAutosaveTimer(): void;
  fastForward(): void;
  stopFastForwarding(): void;
}
