import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { AppStage } from '../types';

export interface IApp extends IUIEventEmitter {
  appStage: AppStage;
  startUp(): Promise<void>;
  saveGame(): void;
  importSavefile(file: File): void;
  exportSavefile(): void;
  deleteSaveData(): Promise<void>;
  restartUpdateTimer(): void;
  restartAutosaveTimer(): void;
  fastForward(): void;
  stopFastForwarding(): void;
}
