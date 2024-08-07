import { Language, MessageFilterEvent, Theme } from '@shared/types';

export interface ISettingsSerializedState {
  language: Language;
  theme: Theme;
  mapCellSize: number;
  messageLogSize: number;
  updateInterval: number;
  autosaveEnabled: boolean;
  autosaveInterval: number;
  enabledMessageFilterEvents: MessageFilterEvent[];
}
