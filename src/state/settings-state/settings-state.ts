import i18n from 'i18next';
import { IAppState } from '@state/app-state/interfaces';
import { Language, Theme } from '@shared/constants';
import { ISettingsFormValues, ISettingsState, ISettingsSerializedState } from './interfaces';
import themes from '@configs/themes.json';

export class SettingsState implements ISettingsState {
  private _appState: IAppState;
  private _language: Language = Language.en;
  private _theme: Theme = Theme.light;
  private _mapCellSize = 3;

  constructor(appState: IAppState) {
    this._appState = appState;
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

    this._appState.saveGame();
  }

  setMapCellSize(mapCellSize: number) {
    this._mapCellSize = mapCellSize;

    this._appState.saveGame();
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
