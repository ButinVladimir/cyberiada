import { injectable } from 'inversify';
import i18n from 'i18next';
import { EventEmitter } from 'eventemitter3';
import { GameAlert, Language, LongNumberFormat, MessageEvent, Theme } from '@shared/types';
import themes from '@configs/themes.json';
import constants from '@configs/constants.json';
import { ISettingsState, ISettingsSerializedState } from './interfaces';
import { SETTINGS_STATE_EVENTS } from './constants';

@injectable()
export class SettingsState implements ISettingsState {
  private _language: Language;
  private _theme: Theme;
  private _messageLogSize: number;
  private _updateInterval: number;
  private _autosaveEnabled: boolean;
  private _autosaveInterval: number;
  private _maxTicksPerUpdate: number;
  private _longNumberFormat: LongNumberFormat;
  private _mapCellSize: number;
  private _enabledMessageEvents: Set<MessageEvent>;
  private _enabledGameAlerts: Set<GameAlert>;

  private readonly _stateEventEmitter: EventEmitter;

  constructor() {
    this._language = Language.en;
    this._theme = Theme.light;
    this._messageLogSize = constants.defaultSettings.messageLogSize;
    this._updateInterval = constants.defaultSettings.updateInterval;
    this._autosaveEnabled = constants.defaultSettings.autosaveEnabled;
    this._autosaveInterval = constants.defaultSettings.autosaveInterval;
    this._maxTicksPerUpdate = constants.defaultSettings.maxTicksPerUpdate;
    this._longNumberFormat = constants.defaultSettings.longNumberFormat as LongNumberFormat;
    this._mapCellSize = constants.defaultSettings.mapSize;
    this._enabledMessageEvents = new Set<MessageEvent>();
    this._enabledGameAlerts = new Set<GameAlert>();

    this._stateEventEmitter = new EventEmitter();
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

  get maxTicksPerUpdate() {
    return this._maxTicksPerUpdate;
  }

  get longNumberFormat() {
    return this._longNumberFormat;
  }

  get mapCellSize() {
    return this._mapCellSize;
  }

  isMessageEventEnabled(event: MessageEvent): boolean {
    return this._enabledMessageEvents.has(event);
  }

  isGameAlertEnabled(gameAlert: GameAlert): boolean {
    return this._enabledGameAlerts.has(gameAlert);
  }

  async setLanguage(language: Language): Promise<void> {
    this._language = language;

    await i18n.changeLanguage(this.language);
    document.documentElement.lang = this.language;

    this._stateEventEmitter.emit(SETTINGS_STATE_EVENTS.UPDATED_LANGUAGE);
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
    this._stateEventEmitter.emit(SETTINGS_STATE_EVENTS.UPDATED_UPDATE_INTERVAL);
  }

  setAutosaveEnabled(autosaveEnabled: boolean) {
    this._autosaveEnabled = autosaveEnabled;
    this._stateEventEmitter.emit(SETTINGS_STATE_EVENTS.UPDATED_AUTOSAVE_INTERVAL);
  }

  setAutosaveInterval(autosaveInterval: number) {
    this._autosaveInterval = autosaveInterval;
    this._stateEventEmitter.emit(SETTINGS_STATE_EVENTS.UPDATED_AUTOSAVE_INTERVAL);
  }

  setMaxTicksPerUpdate(maxTicksPerUpdate: number) {
    this._maxTicksPerUpdate = maxTicksPerUpdate;
  }

  setLongNumberFormat(longNumberFormat: LongNumberFormat) {
    this._longNumberFormat = longNumberFormat;
  }

  setMapCellSize(mapCellSize: number) {
    this._mapCellSize = mapCellSize;
  }

  toggleMessageEvent(event: MessageEvent, enabled: boolean) {
    if (enabled) {
      this._enabledMessageEvents.add(event);
    } else {
      this._enabledMessageEvents.delete(event);
    }
  }

  toggleGameAlert(gameAlert: GameAlert, enabled: boolean) {
    if (enabled) {
      this._enabledGameAlerts.add(gameAlert);
    } else {
      this._enabledGameAlerts.delete(gameAlert);
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
    this.setLongNumberFormat(constants.defaultSettings.longNumberFormat as LongNumberFormat);
    this.setMapCellSize(constants.defaultSettings.mapSize);
    this.deserializeMessageEvents(constants.defaultSettings.messageEvents as MessageEvent[]);
    this.deserializeGameAlerts(constants.defaultSettings.gameAlerts as GameAlert[]);
  }

  async deserialize(serializedState: ISettingsSerializedState): Promise<void> {
    await this.setLanguage(serializedState.language);
    this.setTheme(serializedState.theme);
    this.setMessageLogSize(serializedState.messageLogSize);
    this.setUpdateInterval(serializedState.updateInterval);
    this.setAutosaveEnabled(serializedState.autosaveEnabled);
    this.setAutosaveInterval(serializedState.autosaveInterval);
    this.setMaxTicksPerUpdate(serializedState.maxTicksPerUpdate);
    this.setLongNumberFormat(serializedState.longNumberFormat);
    this.setMapCellSize(serializedState.mapCellSize);
    this.deserializeMessageEvents(serializedState.enabledMessageEvents);
    this.deserializeGameAlerts(serializedState.enabledGameAlerts);
  }

  serialize(): ISettingsSerializedState {
    return {
      language: this.language,
      theme: this.theme,
      messageLogSize: this.messageLogSize,
      updateInterval: this.updateInterval,
      autosaveEnabled: this.autosaveEnabled,
      autosaveInterval: this.autosaveInterval,
      maxTicksPerUpdate: this.maxTicksPerUpdate,
      longNumberFormat: this.longNumberFormat,
      mapCellSize: this.mapCellSize,
      enabledMessageEvents: this.serializeMessageEvents(),
      enabledGameAlerts: this.serializeGameAlerts(),
    };
  }

  addStateEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._stateEventEmitter.addListener(eventName, handler);
  }

  removeStateEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._stateEventEmitter.removeListener(eventName, handler);
  }

  private serializeMessageEvents(): MessageEvent[] {
    return Array.from(this._enabledMessageEvents.values());
  }

  private deserializeMessageEvents(events: MessageEvent[]) {
    this._enabledMessageEvents.clear();
    events.forEach((event) => this._enabledMessageEvents.add(event));
  }

  private serializeGameAlerts(): GameAlert[] {
    return Array.from(this._enabledGameAlerts.values());
  }

  private deserializeGameAlerts(gameAlerts: GameAlert[]) {
    this._enabledGameAlerts.clear();
    gameAlerts.forEach((gameAlert) => this._enabledGameAlerts.add(gameAlert));
  }
}
