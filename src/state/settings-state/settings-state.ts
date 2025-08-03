import { injectable } from 'inversify';
import themes from '@configs/themes.json';
import constants from '@configs/constants.json';
import { decorators } from '@state/container';
import { type IStateUIConnector } from '@state/state-ui-connector';
import { getLocale, setLocale } from '@/configure-localization';
import { Language, LongNumberFormat, Theme, type IFormatter } from '@shared/index';
import type { IApp } from '@state/app';
import { TYPES } from '@state/types';
import {
  ISettingsState,
  ISettingsSerializedState,
  ISettingsMessageEvents,
  ISettingsGameAlerts,
  ISettingsNotificationTypes,
} from './interfaces';
import { SettingsHotkeys } from './settings-hotkeys';
import { SettingsMessageEvents } from './settings-message-events';
import { SettingsGameAlerts } from './settings-game-alerts';
import { SettingsNotificationTypes } from './settings-notification-types';

const { lazyInject } = decorators;

@injectable()
export class SettingsState implements ISettingsState {
  @lazyInject(TYPES.App)
  private _app!: IApp;

  @lazyInject(TYPES.Formatter)
  private _formatter!: IFormatter;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  private _language: Language;
  private _theme: Theme;
  private _messageLogSize: number;
  private _toastDuration: number;
  private _updateInterval: number;
  private _autosaveEnabledOnHide: boolean;
  private _autosaveInterval: number;
  private _fastSpeedMultiplier: number;
  private _maxUpdatesPerTick: number;
  private _longNumberFormat: LongNumberFormat;
  private _messageEvents: ISettingsMessageEvents;
  private _gameAlerts: ISettingsGameAlerts;
  private _notificationTypes: ISettingsNotificationTypes;
  private _hotkeys: SettingsHotkeys;

  constructor() {
    this._language = getLocale() as Language;
    this._theme = Theme.light;
    this._messageLogSize = constants.defaultSettings.messageLogSize;
    this._toastDuration = constants.defaultSettings.toastDuration;
    this._updateInterval = constants.defaultSettings.updateInterval;
    this._autosaveEnabledOnHide = constants.defaultSettings.autosaveEnabledOnHide;
    this._autosaveInterval = constants.defaultSettings.autosaveInterval;
    this._fastSpeedMultiplier = constants.defaultSettings.fastSpeedMultiplier;
    this._maxUpdatesPerTick = constants.defaultSettings.maxUpdatesPerTick;
    this._longNumberFormat = constants.defaultSettings.longNumberFormat as LongNumberFormat;
    this._messageEvents = new SettingsMessageEvents();
    this._gameAlerts = new SettingsGameAlerts();
    this._notificationTypes = new SettingsNotificationTypes();
    this._hotkeys = new SettingsHotkeys();

    this._stateUiConnector.registerEventEmitter(this, [
      '_language',
      '_theme',
      '_messageLogSize',
      '_toastDuration',
      '_updateInterval',
      '_autosaveEnabledOnHide',
      '_autosaveInterval',
      '_fastSpeedMultiplier',
      '_maxUpdatesPerTick',
      '_longNumberFormat',
    ]);
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

  get toastDuration() {
    return this._toastDuration;
  }

  get updateInterval() {
    return this._updateInterval;
  }

  get autosaveEnabledOnHide() {
    return this._autosaveEnabledOnHide;
  }

  get autosaveInterval() {
    return this._autosaveInterval;
  }

  get fastSpeedMultiplier() {
    return this._fastSpeedMultiplier;
  }

  get maxUpdatesPerTick() {
    return this._maxUpdatesPerTick;
  }

  get longNumberFormat() {
    return this._longNumberFormat;
  }

  get messageEvents() {
    return this._messageEvents;
  }

  get gameAlerts() {
    return this._gameAlerts;
  }

  get notificationTypes() {
    return this._notificationTypes;
  }

  get hotkeys() {
    return this._hotkeys;
  }

  async setLanguage(language: Language): Promise<void> {
    this._language = language;

    await setLocale(language);
    document.documentElement.lang = language;

    this._formatter.updateBuiltInFormatters();
  }

  setTheme(theme: Theme) {
    this._theme = theme;

    document.body.className = themes[theme].classes;
  }

  setMessageLogSize(messageLogSize: number) {
    this._messageLogSize = messageLogSize;
  }

  setToastDuration(duration: number) {
    this._toastDuration = duration;
  }

  setUpdateInterval(updateInterval: number) {
    this._updateInterval = updateInterval;
    this._app.restartUpdateTimer();
  }

  setAutosaveEnabledOnHide(autosaveEnabled: boolean) {
    this._autosaveEnabledOnHide = autosaveEnabled;
    this._app.restartAutosaveTimer();
  }

  setAutosaveInterval(autosaveInterval: number) {
    this._autosaveInterval = autosaveInterval;
    this._app.restartAutosaveTimer();
  }

  setFastSpeedMultiplier(fastSpeedMultiplier: number) {
    this._fastSpeedMultiplier = fastSpeedMultiplier;
  }

  setMaxUpdatesPerTick(maxUpdatesPerTick: number) {
    this._maxUpdatesPerTick = maxUpdatesPerTick;
  }

  setLongNumberFormat(longNumberFormat: LongNumberFormat) {
    this._longNumberFormat = longNumberFormat;
  }

  async restoreDefaultSettings(): Promise<void> {
    await this.setLanguage(getLocale() as Language);
    this.setTheme(window.matchMedia('(prefers-color-scheme:dark)').matches ? Theme.dark : Theme.light);
    this.setMessageLogSize(constants.defaultSettings.messageLogSize);
    this.setToastDuration(constants.defaultSettings.toastDuration);
    this.setUpdateInterval(constants.defaultSettings.updateInterval);
    this.setAutosaveEnabledOnHide(constants.defaultSettings.autosaveEnabledOnHide);
    this.setAutosaveInterval(constants.defaultSettings.autosaveInterval);
    this.setFastSpeedMultiplier(constants.defaultSettings.fastSpeedMultiplier);
    this.setMaxUpdatesPerTick(constants.defaultSettings.maxUpdatesPerTick);
    this.setLongNumberFormat(constants.defaultSettings.longNumberFormat as LongNumberFormat);
    await this._messageEvents.startNewState();
    await this._gameAlerts.startNewState();
    await this._notificationTypes.startNewState();
    await this._hotkeys.startNewState();
  }

  async startNewState(): Promise<void> {
    await this.restoreDefaultSettings();
  }

  async deserialize(serializedState: ISettingsSerializedState): Promise<void> {
    await this.setLanguage(serializedState.language);
    this.setTheme(serializedState.theme);
    this.setMessageLogSize(serializedState.messageLogSize);
    this.setToastDuration(serializedState.toastDuration);
    this.setUpdateInterval(serializedState.updateInterval);
    this.setAutosaveEnabledOnHide(serializedState.autosaveEnabledOnHide);
    this.setAutosaveInterval(serializedState.autosaveInterval);
    this.setFastSpeedMultiplier(serializedState.fastSpeedMultiplier);
    this.setMaxUpdatesPerTick(serializedState.maxUpdatesPerTick);
    this.setLongNumberFormat(serializedState.longNumberFormat);
    await this._messageEvents.deserialize(serializedState.enabledMessageEvents);
    await this._gameAlerts.deserialize(serializedState.enabledGameAlerts);
    await this._notificationTypes.deserialize(serializedState.enabledNotificationTypes);
    await this._hotkeys.deserialize(serializedState.hotkeys);
  }

  serialize(): ISettingsSerializedState {
    return {
      language: this.language,
      theme: this.theme,
      messageLogSize: this.messageLogSize,
      toastDuration: this.toastDuration,
      updateInterval: this.updateInterval,
      autosaveEnabledOnHide: this.autosaveEnabledOnHide,
      autosaveInterval: this.autosaveInterval,
      fastSpeedMultiplier: this.fastSpeedMultiplier,
      maxUpdatesPerTick: this.maxUpdatesPerTick,
      longNumberFormat: this.longNumberFormat,
      enabledMessageEvents: this._messageEvents.serialize(),
      enabledGameAlerts: this._gameAlerts.serialize(),
      enabledNotificationTypes: this._notificationTypes.serialize(),
      hotkeys: this._hotkeys.serialize(),
    };
  }
}
