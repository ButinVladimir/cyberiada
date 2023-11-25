import i18n from 'i18next';
import { makeAutoObservable } from 'mobx';
import { ISettingsState } from '../interfaces';
import { Language } from '../types';

export class SettingsState implements ISettingsState {
  updateIntervalTime = 100;
  bonusTimeSpeed = 20;
  developerModeEnabled = false;
  language: Language = 'en';

  constructor() {
    makeAutoObservable(this);
  }

  setBonusTimeSpeed = (speed: number): void => {
    this.bonusTimeSpeed = speed;
  };

  toggleDeveloperMode = (value: boolean): void => {
    this.developerModeEnabled = value;
  };

  setLanguage = async (language: Language): Promise<void> => {
    await i18n.changeLanguage(language);
    this.language = language;
  };
}
