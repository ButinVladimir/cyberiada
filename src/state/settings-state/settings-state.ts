import { injectable } from 'inversify';
import i18n from 'i18next';
import { Language, Theme } from '@shared/types';
import { ISettingsState, ISettingsSerializedState } from './interfaces';
import themes from '@configs/themes.json';

@injectable()
export class SettingsState implements ISettingsState {
  private _language: Language;
  private _theme: Theme;
  private _mapCellSize: number;

  constructor() {
    this._language = Language.en;
    this._theme = Theme.light;
    this._mapCellSize = 3;
  }

  get language() {
    return this._language;
  }

  get theme() {
    return this._theme;
  }

  get mapCellSize() {
    return this._mapCellSize;
  }

  async setLanguage(language: Language): Promise<void> {
    this._language = language;

    await i18n.changeLanguage(this.language);
    document.documentElement.lang = this.language;
  }

  setTheme(theme: Theme) {
    this._theme = theme;

    document.body.className = themes[this.theme].classes;
  }

  setMapCellSize(mapCellSize: number) {
    this._mapCellSize = mapCellSize;
  }

  async startNewState(): Promise<void> {
    await i18n.changeLanguage();

    await this.setLanguage(i18n.resolvedLanguage! as Language);
    this.setTheme(window.matchMedia('(prefers-color-scheme:dark)').matches ? Theme.dark : Theme.light);
    this.setMapCellSize(3);
  }

  async deserialize(serializedState: ISettingsSerializedState): Promise<void> {
    await this.setLanguage(serializedState.language);
    this.setTheme(serializedState.theme);
    this.setMapCellSize(serializedState.mapCellSize);
  }

  serialize(): ISettingsSerializedState {
    return {
      language: this.language,
      theme: this.theme,
      mapCellSize: this.mapCellSize,
    };
  }
}
