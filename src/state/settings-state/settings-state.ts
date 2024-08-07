import { injectable } from 'inversify';
import i18n from 'i18next';
import { Language, MessageFilterEvent, Theme } from '@shared/types';
import type { IApp } from '@state/app/interfaces/app';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { ISettingsState, ISettingsSerializedState } from './interfaces';
import themes from '@configs/themes.json';
import constants from '@configs/constants.json';

const { lazyInject } = decorators;

@injectable()
export class SettingsState implements ISettingsState {
  @lazyInject(TYPES.App)
  private _app!: IApp;

  private _language: Language;
  private _theme: Theme;
  private _messageLogSize: number;
  private _updateInterval: number;
  private _autosaveEnabled: boolean;
  private _autosaveInterval: number;
  private _mapCellSize: number;
  private _enabledMessageFilterEvents: Set<MessageFilterEvent>;

  constructor() {
    this._language = Language.en;
    this._theme = Theme.light;
    this._messageLogSize = constants.defaultSettings.messageLogSize;
    this._updateInterval = constants.defaultSettings.updateInterval;
    this._autosaveEnabled = constants.defaultSettings.autosaveEnabled;
    this._autosaveInterval = constants.defaultSettings.autosaveInterval;
    this._mapCellSize = constants.defaultSettings.mapSize;
    this._enabledMessageFilterEvents = new Set<MessageFilterEvent>();
  }

  get language() {
    return this._language;
  }

  get theme() {
    return this._theme;
  }

  get messageLogSize() {
    return this._messageLogSize;
  }

  get updateInterval() {
    return this._updateInterval;
  }

  get autosaveEnabled() {
    return this._autosaveEnabled;
  }

  get autosaveInterval() {
    return this._autosaveInterval;
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

  setMessageLogSize(messageLogSize: number) {
    this._messageLogSize = messageLogSize;
  }

  setUpdateInterval(updateInterval: number) {
    this._updateInterval = updateInterval;
    this._app.restartUpdateTimer();
  }

  setAutosaveEnabled(autosaveEnabled: boolean) {
    this._autosaveEnabled = autosaveEnabled;
    this._app.restartAutosaveTimer();
  }

  setAutosaveInterval(autosaveInterval: number) {
    this._autosaveInterval = autosaveInterval;
    this._app.restartAutosaveTimer();
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
    this.setMessageLogSize(constants.defaultSettings.messageLogSize);
    this.setUpdateInterval(constants.defaultSettings.updateInterval);
    this.setAutosaveEnabled(constants.defaultSettings.autosaveEnabled);
    this.setAutosaveInterval(constants.defaultSettings.autosaveInterval);
    this.setMapCellSize(constants.defaultSettings.mapSize);
    this.deserializeMessageFilter(constants.defaultSettings.messageFilterEvents as MessageFilterEvent[]);
  }

  async deserialize(serializedState: ISettingsSerializedState): Promise<void> {
    await this.setLanguage(serializedState.language);
    this.setTheme(serializedState.theme);
    this.setMessageLogSize(serializedState.messageLogSize);
    this.setUpdateInterval(serializedState.updateInterval);
    this.setAutosaveEnabled(serializedState.autosaveEnabled);
    this.setAutosaveInterval(serializedState.autosaveInterval);
    this.setMapCellSize(serializedState.mapCellSize);
    this.deserializeMessageFilter(serializedState.enabledMessageFilterEvents);
  }

  serialize(): ISettingsSerializedState {
    return {
      language: this.language,
      theme: this.theme,
      messageLogSize: this.messageLogSize,
      updateInterval: this.updateInterval,
      autosaveEnabled: this.autosaveEnabled,
      autosaveInterval: this.autosaveInterval,
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
