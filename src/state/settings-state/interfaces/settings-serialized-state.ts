import { Language, MessageFilterEvent, Theme } from '@shared/types';

export interface ISettingsSerializedState {
  language: Language;
  theme: Theme;
  mapCellSize: number;
  enabledMessageFilterEvents: MessageFilterEvent[];
}
