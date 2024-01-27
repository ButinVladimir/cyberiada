import i18n from 'i18next';
import { makeAutoObservable } from 'mobx';
import { ISettingsState } from '../interfaces';
import { Language, DEFAULT_LANGUAGE } from '@state/common';

export class SettingsState implements ISettingsState {
  gameUpdateInterval = 1000;
  bonusTimeSpeed = 10;
  developerModeEnabled = true;
  language: Language = DEFAULT_LANGUAGE;

  constructor() {
    makeAutoObservable(this);
  }

  setLanguage = async (language: Language): Promise<void> => {
    this.language = language;
    await i18n.changeLanguage(language);
  };
}
