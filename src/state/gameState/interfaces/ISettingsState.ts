import { Language } from '@state/common';

export interface ISettingsState {
  gameUpdateInterval: number;
  bonusTimeSpeed: number;
  developerModeEnabled: boolean;
  language: Language;

  setGameUpdateInterval(interval: number): void;
  setBonusTimeSpeed(speed: number): void;
  toggleDeveloperMode(value: boolean): void;
  setLanguage(language: Language): Promise<void>;
}
