import { Language, Theme, MessageFilterEvent } from '@shared/types';
import { ISettingsSerializedState } from './settings-serialized-state';

export interface ISettingsState {
  language: Language;
  theme: Theme;
  messageLogSize: number;
  updateInterval: number;
  autosaveEnabled: boolean;
  autosaveInterval: number;
  maxTicksPerUpdate: number;
  mapCellSize: number;
  isMessageFilterEventEnabled(event: MessageFilterEvent): boolean;
  setLanguage(language: Language): Promise<void>;
  setTheme(theme: Theme): void;
  setMessageLogSize(messageLogSize: number): void;
  setUpdateInterval(updateInterval: number): void;
  setAutosaveEnabled(autosaveEnabled: boolean): void;
  setAutosaveInterval(autosaveInterval: number): void;
  setMaxTicksPerUpdate(maxTicksPerUpdate: number): void;
  setMapCellSize(mapSize: number): void;
  toggleMessageFilterEvent(event: MessageFilterEvent, enabled: boolean): void;
  startNewState(): Promise<void>;
  deserialize(serializedState: ISettingsSerializedState): Promise<void>;
  serialize(): ISettingsSerializedState;
}
