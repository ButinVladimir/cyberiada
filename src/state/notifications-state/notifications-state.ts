import { inject, injectable } from 'inversify';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { TYPES } from '@state/types';
import { NotificationType } from '@shared/types';
import { INotificationsState, INotification } from './interfaces';

@injectable()
export class NotificationsState implements INotificationsState {
  private UI_EVENTS = {
    UPDATED_NOTIFICATIONS: Symbol('UPDATED_NOTIFICATIONS'),
  };

  private _stateUiConnector: IStateUIConnector;
  private _settingsState: ISettingsState;
  private readonly _notifications: INotification[];

  constructor(
    @inject(TYPES.StateUIConnector) _stateUiConnector: IStateUIConnector,
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
  ) {
    this._stateUiConnector = _stateUiConnector;
    this._settingsState = _settingsState;

    this._notifications = [];

    this._stateUiConnector.registerEvents(this.UI_EVENTS);
  }

  pushNotification(notificationType: NotificationType, message: string, force?: boolean) {
    if (!force && !this._settingsState.isNotificationTypeEnabled(notificationType)) {
      return;
    }

    this._notifications.push({
      notificationType,
      message,
    });

    this._stateUiConnector.enqueueEvent(this.UI_EVENTS.UPDATED_NOTIFICATIONS);
  }

  getFirstUnreadNotification(): INotification | undefined {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.UPDATED_NOTIFICATIONS);

    while (this.hasUnreadNotifications()) {
      const notification = this._notifications[0];

      if (this._settingsState.isNotificationTypeEnabled(notification.notificationType)) {
        return notification;
      }

      this._notifications.shift();
    }

    return undefined;
  }

  hasUnreadNotifications(): boolean {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.UPDATED_NOTIFICATIONS);

    return this._notifications.length > 0;
  }

  hasNextNotification(): boolean {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.UPDATED_NOTIFICATIONS);

    return this._notifications.length > 1;
  }

  popUnreadNotification() {
    if (this.hasUnreadNotifications()) {
      this._notifications.shift();

      this._stateUiConnector.enqueueEvent(this.UI_EVENTS.UPDATED_NOTIFICATIONS);
    }
  }

  clearNotifications() {
    this._notifications.length = 0;

    this._stateUiConnector.enqueueEvent(this.UI_EVENTS.UPDATED_NOTIFICATIONS);
  }
}
