import { Language, Theme } from '@shared/constants';
import { ISettingsFormValues } from './settings-form-values';
import { ISettingsSerializedState } from './settings-serialized-state';

export interface ISettingsState {
  language: Language;
  theme: Theme;
  mapCellSize: number;
  applyFormValues(values: ISettingsFormValues): Promise<void>;
  setMapCellSize(mapSize: number): void;
  startNewState(): Promise<void>;
  deserialize(serializedState: ISettingsSerializedState): Promise<void>;
  serialize(): ISettingsSerializedState;
}
