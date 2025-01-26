import { ISerializeable } from '@shared/interfaces';
import { Language, Theme, MessageEvent, LongNumberFormat, GameAlert, NotificationType } from '@shared/types';
import { ISettingsSerializedState } from './settings-serialized-state';

export interface ISettingsState extends ISerializeable<ISettingsSerializedState> {
  language: Language;
  theme: Theme;
  messageLogSize: number;
  toastDuration: number;
  updateInterval: number;
  autosaveEnabled: boolean;
  autosaveInterval: number;
  fastSpeedMultiplier: number;
  maxUpdatesPerTick: number;
  longNumberFormat: LongNumberFormat;
  mapCellSize: number;
  isMessageEventEnabled(event: MessageEvent): boolean;
  isGameAlertEnabled(gameAlert: GameAlert): boolean;
  isNotificationTypeEnabled(notificationType: NotificationType): boolean;
  setLanguage(language: Language): Promise<void>;
  setTheme(theme: Theme): void;
  setMessageLogSize(messageLogSize: number): void;
  setToastDuration(duration: number): void;
  setUpdateInterval(updateInterval: number): void;
  setAutosaveEnabled(autosaveEnabled: boolean): void;
  setAutosaveInterval(autosaveInterval: number): void;
  setFastSpeedMultiplier(fastSpeedMultiplier: number): void;
  setMaxUpdatesPerTick(maxUpdatesPerTick: number): void;
  setLongNumberFormat(longNumberFormat: LongNumberFormat): void;
  setMapCellSize(mapSize: number): void;
  toggleMessageEvent(event: MessageEvent, enabled: boolean): void;
  toggleGameAlert(gameAlert: GameAlert, enabled: boolean): void;
  toggleNotificationType(notificationType: NotificationType, enabled: boolean): void;
}
