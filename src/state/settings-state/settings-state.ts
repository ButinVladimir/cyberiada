import { injectable } from 'inversify';
import i18n from 'i18next';
import { decorators } from '@state/container';
import {
  GameAlert,
  GameStateAlert,
  ProgramAlert,
  Language,
  LongNumberFormat,
  MessageEvent,
  Theme,
  ProgramsEvent,
  PurchaseEvent,
  GameStateEvent,
  NotificationType,
} from '@shared/types';
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
  private _updateInterval: number;
  private _autosaveEnabled: boolean;
  private _autosaveInterval: number;
  private _maxUpdatesPerTick: number;
  private _maxUpdatesPerFastForward: number;
  private _longNumberFormat: LongNumberFormat;
  private _mapCellSize: number;
  private _enabledMessageEvents: Set<MessageEvent>;
  private _enabledGameAlerts: Set<GameAlert>;
  private _enabledNotificationTypes: Set<NotificationType>;

  constructor() {
    this._language = Language.en;
    this._theme = Theme.light;
    this._messageLogSize = constants.defaultSettings.messageLogSize;
    this._updateInterval = constants.defaultSettings.updateInterval;
    this._autosaveEnabled = constants.defaultSettings.autosaveEnabled;
    this._autosaveInterval = constants.defaultSettings.autosaveInterval;
    this._maxUpdatesPerTick = constants.defaultSettings.maxUpdatesPerTick;
    this._maxUpdatesPerFastForward = constants.defaultSettings.maxUpdatesPerFastForward;
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

  get updateInterval() {
    return this._updateInterval;
  }

  get autosaveEnabled() {
    return this._autosaveEnabled;
  }

  get autosaveInterval() {
    return this._autosaveInterval;
  }

  get maxUpdatesPerTick() {
    return this._maxUpdatesPerTick;
  }

  get maxUpdatesPerFastForward() {
    return this._maxUpdatesPerFastForward;
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

  setMaxUpdatesPerTick(maxUpdatesPerTick: number) {
    this._maxUpdatesPerTick = maxUpdatesPerTick;
  }

  setMaxUpdatesPerFastForward(maxUpdatesPerFastForward: number) {
    this._maxUpdatesPerFastForward = maxUpdatesPerFastForward;
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
    this.setUpdateInterval(constants.defaultSettings.updateInterval);
    this.setAutosaveEnabled(constants.defaultSettings.autosaveEnabled);
    this.setAutosaveInterval(constants.defaultSettings.autosaveInterval);
    this.setMaxUpdatesPerTick(constants.defaultSettings.maxUpdatesPerTick);
    this.setMaxUpdatesPerFastForward(constants.defaultSettings.maxUpdatesPerFastForward);
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
    this.setUpdateInterval(serializedState.updateInterval);
    this.setAutosaveEnabled(serializedState.autosaveEnabled);
    this.setAutosaveInterval(serializedState.autosaveInterval);
    this.setMaxUpdatesPerTick(serializedState.maxUpdatesPerTick);
    this.setMaxUpdatesPerFastForward(serializedState.maxUpdatesPerFastForward);
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
      updateInterval: this.updateInterval,
      autosaveEnabled: this.autosaveEnabled,
      autosaveInterval: this.autosaveInterval,
      maxUpdatesPerTick: this.maxUpdatesPerTick,
      maxUpdatesPerFastForward: this.maxUpdatesPerFastForward,
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
    return [...Object.values(GameStateEvent), ...Object.values(PurchaseEvent), ...Object.values(ProgramsEvent)];
  }

  private getAllGameAlerts(): GameAlert[] {
    return [...Object.values(GameStateAlert), ...Object.values(ProgramAlert)];
  }

  private getAllNotificationTypes(): NotificationType[] {
    return Object.values(NotificationType);
  }
}
