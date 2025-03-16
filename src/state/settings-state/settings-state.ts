import { injectable } from 'inversify';
import i18n from 'i18next';
import { decorators } from '@state/container';
import { GameAlert, Language, LongNumberFormat, MessageEvent, Theme, NotificationType } from '@shared/types';
import {
  CLONE_EVENTS,
  GAME_STATE_ALERTS,
  GAME_STATE_EVENTS,
  NOTIFICATION_TYPES,
  PROGRAM_ALERTS,
  PROGRAM_EVENTS,
  PURCHASE_EVENTS,
} from '@shared/constants';
import type { IApp } from '@state/app/interfaces/app';
import { TYPES } from '@state/types';
import themes from '@configs/themes.json';
import constants from '@configs/constants.json';
import { ISettingsState, ISettingsSerializedState } from './interfaces';

const { lazyInject } = decorators;

@injectable()
export class SettingsState implements ISettingsState {
  @lazyInject(TYPES.App)
  private _app!: IApp;

  private _language: Language;
  private _theme: Theme;
  private _messageLogSize: number;
  private _toastDuration: number;
  private _updateInterval: number;
  private _autosaveEnabled: boolean;
  private _autosaveInterval: number;
  private _fastSpeedMultiplier: number;
  private _maxUpdatesPerTick: number;
  private _longNumberFormat: LongNumberFormat;
  private _mapCellSize: number;
  private _enabledMessageEvents: Set<MessageEvent>;
  private _enabledGameAlerts: Set<GameAlert>;
  private _enabledNotificationTypes: Set<NotificationType>;

  constructor() {
    this._language = Language.en;
    this._theme = Theme.light;
    this._messageLogSize = constants.defaultSettings.messageLogSize;
    this._toastDuration = constants.defaultSettings.toastDuration;
    this._updateInterval = constants.defaultSettings.updateInterval;
    this._autosaveEnabled = constants.defaultSettings.autosaveEnabled;
    this._autosaveInterval = constants.defaultSettings.autosaveInterval;
    this._fastSpeedMultiplier = constants.defaultSettings.fastSpeedMultiplier;
    this._maxUpdatesPerTick = constants.defaultSettings.maxUpdatesPerTick;
    this._longNumberFormat = constants.defaultSettings.longNumberFormat as LongNumberFormat;
    this._mapCellSize = constants.defaultSettings.mapSize;
    this._enabledMessageEvents = new Set<MessageEvent>();
    this._enabledGameAlerts = new Set<GameAlert>();
    this._enabledNotificationTypes = new Set<NotificationType>();
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

  get autosaveEnabled() {
    return this._autosaveEnabled;
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

  get mapCellSize() {
    return this._mapCellSize;
  }

  isMessageEventEnabled(event: MessageEvent): boolean {
    return this._enabledMessageEvents.has(event);
  }

  isGameAlertEnabled(gameAlert: GameAlert): boolean {
    return this._enabledGameAlerts.has(gameAlert);
  }

  isNotificationTypeEnabled(notificationType: NotificationType): boolean {
    return this._enabledNotificationTypes.has(notificationType);
  }

  async setLanguage(language: Language): Promise<void> {
    this._language = language;

    await i18n.changeLanguage(this.language);
    document.documentElement.lang = this.language;

    this._app.refreshUI();
  }

  setTheme(theme: Theme) {
    this._theme = theme;

    document.body.className = themes[this.theme].classes;
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

  setAutosaveEnabled(autosaveEnabled: boolean) {
    this._autosaveEnabled = autosaveEnabled;
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

  toggleNotificationType(notificationType: NotificationType, enabled: boolean) {
    if (enabled) {
      this._enabledNotificationTypes.add(notificationType);
    } else {
      this._enabledNotificationTypes.delete(notificationType);
    }
  }

  async startNewState(): Promise<void> {
    await i18n.changeLanguage();

    await this.setLanguage(i18n.resolvedLanguage! as Language);
    this.setTheme(window.matchMedia('(prefers-color-scheme:dark)').matches ? Theme.dark : Theme.light);
    this.setMessageLogSize(constants.defaultSettings.messageLogSize);
    this.setToastDuration(constants.defaultSettings.toastDuration);
    this.setUpdateInterval(constants.defaultSettings.updateInterval);
    this.setAutosaveEnabled(constants.defaultSettings.autosaveEnabled);
    this.setAutosaveInterval(constants.defaultSettings.autosaveInterval);
    this.setFastSpeedMultiplier(constants.defaultSettings.fastSpeedMultiplier);
    this.setMaxUpdatesPerTick(constants.defaultSettings.maxUpdatesPerTick);
    this.setLongNumberFormat(constants.defaultSettings.longNumberFormat as LongNumberFormat);
    this.setMapCellSize(constants.defaultSettings.mapSize);
    this.deserializeMessageEvents(this.getAllMessageEvents());
    this.deserializeGameAlerts(this.getAllGameAlerts());
    this.deserializeNotificationTypes(this.getAllNotificationTypes());
  }

  async deserialize(serializedState: ISettingsSerializedState): Promise<void> {
    await this.setLanguage(serializedState.language);
    this.setTheme(serializedState.theme);
    this.setMessageLogSize(serializedState.messageLogSize);
    this.setToastDuration(serializedState.toastDuration);
    this.setUpdateInterval(serializedState.updateInterval);
    this.setAutosaveEnabled(serializedState.autosaveEnabled);
    this.setAutosaveInterval(serializedState.autosaveInterval);
    this.setFastSpeedMultiplier(serializedState.fastSpeedMultiplier);
    this.setMaxUpdatesPerTick(serializedState.maxUpdatesPerTick);
    this.setLongNumberFormat(serializedState.longNumberFormat);
    this.setMapCellSize(serializedState.mapCellSize);
    this.deserializeMessageEvents(serializedState.enabledMessageEvents);
    this.deserializeGameAlerts(serializedState.enabledGameAlerts);
    this.deserializeNotificationTypes(serializedState.enabledNotificationTypes);
  }

  serialize(): ISettingsSerializedState {
    return {
      language: this.language,
      theme: this.theme,
      messageLogSize: this.messageLogSize,
      toastDuration: this.toastDuration,
      updateInterval: this.updateInterval,
      autosaveEnabled: this.autosaveEnabled,
      autosaveInterval: this.autosaveInterval,
      fastSpeedMultiplier: this.fastSpeedMultiplier,
      maxUpdatesPerTick: this.maxUpdatesPerTick,
      longNumberFormat: this.longNumberFormat,
      mapCellSize: this.mapCellSize,
      enabledMessageEvents: this.serializeMessageEvents(),
      enabledGameAlerts: this.serializeGameAlerts(),
      enabledNotificationTypes: this.serializeNotificationTypes(),
    };
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

  private serializeNotificationTypes(): NotificationType[] {
    return Array.from(this._enabledNotificationTypes.values());
  }

  private deserializeNotificationTypes(notificationTypes: NotificationType[]) {
    this._enabledNotificationTypes.clear();
    notificationTypes.forEach((notificationType) => this._enabledNotificationTypes.add(notificationType));
  }

  private getAllMessageEvents(): MessageEvent[] {
    return [...GAME_STATE_EVENTS, ...PURCHASE_EVENTS, ...PROGRAM_EVENTS, ...CLONE_EVENTS];
  }

  private getAllGameAlerts(): GameAlert[] {
    return [...GAME_STATE_ALERTS, ...PROGRAM_ALERTS];
  }

  private getAllNotificationTypes(): NotificationType[] {
    return NOTIFICATION_TYPES;
  }
}
