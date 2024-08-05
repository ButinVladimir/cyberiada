import { Language, Theme } from '@shared/types';
import { ISettingsSerializedState } from './settings-serialized-state';

export interface ISettingsState {
  language: Language;
  theme: Theme;
  mapCellSize: number;
  setLanguage(language: Language): Promise<void>;
  setTheme(theme: Theme): void;
  setMapCellSize(mapSize: number): void;
  startNewState(): Promise<void>;
  deserialize(serializedState: ISettingsSerializedState): Promise<void>;
  serialize(): ISettingsSerializedState;
}
