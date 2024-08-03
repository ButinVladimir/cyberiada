import { injectable } from 'inversify';
import i18n from 'i18next';
import { Language, Theme } from '@shared/constants';
import { ISettingsFormValues, ISettingsState, ISettingsSerializedState } from './interfaces';
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

  async applyFormValues(values: ISettingsFormValues): Promise<void> {
    this._language = values.language;
    this._theme = values.theme;

    await this._updateBrowserSettings();
  }

  setMapCellSize(mapCellSize: number) {
    this._mapCellSize = mapCellSize;
  }

  async startNewState(): Promise<void> {
    await i18n.changeLanguage();

    this._language = i18n.resolvedLanguage! as Language;
    this._theme = window.matchMedia('(prefers-color-scheme:dark)').matches ? Theme.dark : Theme.light;
    this._mapCellSize = 3;

    await this._updateBrowserSettings();
  }

  async deserialize(serializedState: ISettingsSerializedState): Promise<void> {
    this._language = serializedState.language;
    this._theme = serializedState.theme;
    this._mapCellSize = serializedState.mapCellSize;

    await this._updateBrowserSettings();
  }

  serialize(): ISettingsSerializedState {
    return {
      language: this.language,
      theme: this.theme,
      mapCellSize: this.mapCellSize,
    };
  }

  private async _updateBrowserSettings(): Promise<void> {
    await i18n.changeLanguage(this.language);
    document.documentElement.lang = this.language;
    document.body.className = themes[this.theme].classes;
  }
}
