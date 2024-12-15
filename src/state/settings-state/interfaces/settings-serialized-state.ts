import { GameAlert, Language, LongNumberFormat, MessageEvent, NotificationType, Theme } from '@shared/types';

export interface ISettingsSerializedState {
  language: Language;
  theme: Theme;
  mapCellSize: number;
  messageLogSize: number;
  updateInterval: number;
  autosaveEnabled: boolean;
  autosaveInterval: number;
  fastSpeedMultiplier: number;
  maxUpdatesPerTick: number;
  longNumberFormat: LongNumberFormat;
  enabledMessageEvents: MessageEvent[];
  enabledGameAlerts: GameAlert[];
  enabledNotificationTypes: NotificationType[];
}
