import { Language, Theme } from '@shared/constants';
import { ISettingsFormValues } from './settings-form-values';
import { ISettingsSerializedState } from './settings-serialized-state';

export interface ISettingsState {
  language: Language;
  theme: Theme;
  applyFormValues(values: ISettingsFormValues): Promise<void>;
  startNewState(): Promise<void>;
  deserialize(serializedState: ISettingsSerializedState): Promise<void>;
  serialize(): ISettingsSerializedState;
}
