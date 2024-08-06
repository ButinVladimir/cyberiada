import { injectable } from 'inversify';
import i18n from 'i18next';
import { Language, MessageFilterEvent, Theme } from '@shared/types';
import { ISettingsState, ISettingsSerializedState } from './interfaces';
import themes from '@configs/themes.json';
import constants from '@configs/constants.json';

@injectable()
export class SettingsState implements ISettingsState {
  private _language: Language;
  private _theme: Theme;
  private _mapCellSize: number;
  private _enabledMessageFilterEvents: Set<MessageFilterEvent>;

  constructor() {
    this._language = Language.en;
    this._theme = Theme.light;
    this._mapCellSize = constants.defaultMapSize;
    this._enabledMessageFilterEvents = new Set<MessageFilterEvent>();
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

  isMessageFilterEventEnabled(event: MessageFilterEvent): boolean {
    return this._enabledMessageFilterEvents.has(event);
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

  toggleMessageFilterEvent(event: MessageFilterEvent, enabled: boolean) {
    if (enabled) {
      this._enabledMessageFilterEvents.add(event);
    } else {
      this._enabledMessageFilterEvents.delete(event);
    }
  }

  async startNewState(): Promise<void> {
    await i18n.changeLanguage();

    await this.setLanguage(i18n.resolvedLanguage! as Language);
    this.setTheme(window.matchMedia('(prefers-color-scheme:dark)').matches ? Theme.dark : Theme.light);
    this.setMapCellSize(constants.defaultMapSize);
    this.deserializeMessageFilter(constants.defaultMessageFilter as MessageFilterEvent[]);
  }

  async deserialize(serializedState: ISettingsSerializedState): Promise<void> {
    await this.setLanguage(serializedState.language);
    this.setTheme(serializedState.theme);
    this.setMapCellSize(serializedState.mapCellSize);
    this.deserializeMessageFilter(serializedState.enabledMessageFilterEvents);
  }

  serialize(): ISettingsSerializedState {
    return {
      language: this.language,
      theme: this.theme,
      mapCellSize: this.mapCellSize,
      enabledMessageFilterEvents: this.serializeMessageFilter(),
    };
  }

  private serializeMessageFilter(): MessageFilterEvent[] {
    return Array.from(this._enabledMessageFilterEvents.values());
  }

  private deserializeMessageFilter(events: MessageFilterEvent[]) {
    this._enabledMessageFilterEvents.clear();
    events.forEach((event) => this._enabledMessageFilterEvents.add(event));
  }
}
