import { Language, Theme } from '@shared/constants';

export interface ISettingsFormValues {
  language: Language;
  theme: Theme;
}

export interface ISettingsState {
  language: Language;
  theme: Theme;
  applyFormValues(values: ISettingsFormValues): Promise<void>;
  startNewState(): Promise<void>;
  loadState(savedState: ISettingsStoredState): Promise<void>;
  buildSaveState(): ISettingsStoredState;
}

export interface ISettingsStoredState {
  language: Language;
  theme: Theme;
}
