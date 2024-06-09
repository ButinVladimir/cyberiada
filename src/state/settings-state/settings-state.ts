import 'reflect-metadata';
import i18n from 'i18next';
import { injectable } from 'inversify';
import { EventEmitter } from 'eventemitter3';
import { Language, Theme } from '@shared/constants';
import { ISettingsFormValues, ISettingsState } from "./interfaces";
import { SETTINGS_EVENTS } from './constants';
import themes from '@configs/themes.json';

@injectable()
export class SettingsState implements ISettingsState {
  private _language: Language = Language.enUS;
  private _theme: Theme = Theme.light;
  public readonly eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();

    this._language = i18n.resolvedLanguage! as Language;
    this._theme = window.matchMedia('(prefers-color-scheme:dark)').matches 
      ? Theme.dark
      : Theme.light;
  }

  applyFormValues(values: ISettingsFormValues): void {
    this._language = values.language;
    this._theme = values.theme;

    this._updateBrowserSettings().catch((e) => { console.error(e); });
  }

  get language() {
    return this._language;
  }

  get theme() {
    return this._theme;
  }

  private async _updateBrowserSettings(): Promise<void> {
    await i18n.changeLanguage(this.language);
    document.body.className = themes[this.theme].classes;

    this.eventEmitter.emit(SETTINGS_EVENTS.updated);
  }
}