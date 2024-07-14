import { Language, Theme } from '@shared/constants';

export interface ISettingsSerializedState {
  language: Language;
  theme: Theme;
  mapCellSize: number;
}
