import { Language } from '@state/common';

export interface ISettingsState {
  gameUpdateInterval: number;
  bonusTimeSpeed: number;
  developerModeEnabled: boolean;
  language: Language;

  setLanguage(language: Language): Promise<void>;
}
