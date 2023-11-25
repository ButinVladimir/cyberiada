import { Language } from '../types';

export interface ISettingsState {
  updateIntervalTime: number;
  bonusTimeSpeed: number;
  developerModeEnabled: boolean;
  language: Language;

  setBonusTimeSpeed(speed: number): void;
  toggleDeveloperMode(value: boolean): void;
  setLanguage(language: Language): Promise<void>;
}
