import { Language, Theme, MessageFilterEvent } from '@shared/types';
import { ISettingsSerializedState } from './settings-serialized-state';

export interface ISettingsState {
  language: Language;
  theme: Theme;
  mapCellSize: number;
  isMessageFilterEventEnabled(event: MessageFilterEvent): boolean;
  setLanguage(language: Language): Promise<void>;
  setTheme(theme: Theme): void;
  setMapCellSize(mapSize: number): void;
  toggleMessageFilterEvent(event: MessageFilterEvent, enabled: boolean): void;
  startNewState(): Promise<void>;
  deserialize(serializedState: ISettingsSerializedState): Promise<void>;
  serialize(): ISettingsSerializedState;
}
