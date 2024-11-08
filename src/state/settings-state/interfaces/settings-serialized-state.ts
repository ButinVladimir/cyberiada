import { GameAlert, Language, LongNumberFormat, MessageEvent, Theme } from '@shared/types';

export interface ISettingsSerializedState {
  language: Language;
  theme: Theme;
  mapCellSize: number;
  messageLogSize: number;
  updateInterval: number;
  autosaveEnabled: boolean;
  autosaveInterval: number;
  maxTicksPerUpdate: number;
  maxTicksPerFastForward: number;
  longNumberFormat: LongNumberFormat;
  enabledMessageEvents: MessageEvent[];
  enabledGameAlerts: GameAlert[];
}
