import { inject, injectable } from 'inversify';
import { EventBatcher } from '@shared/event-batcher';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { TYPES } from '@state/types';
import { INotificationsState, INotification } from './interfaces';
import { NOTIFICATION_STATE_UI_EVENTS } from './constants';
import { NotificationType } from '@shared/types';

@injectable()
export class NotificationsState implements INotificationsState {
  readonly uiEventBatcher: EventBatcher;

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

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  pushNotification(notificationType: NotificationType, parameters?: Record<string, any>, force?: boolean) {
    if (!force && !this._settingsState.isNotificationTypeEnabled(notificationType)) {
      return;
    }

    this._notifications.push({
      notificationType,
      parameters,
    });

    this.uiEventBatcher.enqueueEvent(NOTIFICATION_STATE_UI_EVENTS.UPDATED_NOTIFICATIONS);
  }

  getFirstUnreadNotification(): INotification | undefined {
    this._stateUiConnector.connectEventHandler(this, NOTIFICATION_STATE_UI_EVENTS.UPDATED_NOTIFICATIONS);

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
    this._stateUiConnector.connectEventHandler(this, NOTIFICATION_STATE_UI_EVENTS.UPDATED_NOTIFICATIONS);

    return this._notifications.length > 0;
  }

  hasNextNotification(): boolean {
    this._stateUiConnector.connectEventHandler(this, NOTIFICATION_STATE_UI_EVENTS.UPDATED_NOTIFICATIONS);

    return this._notifications.length > 1;
  }

  popUnreadNotification() {
    if (this.hasUnreadNotifications()) {
      this._notifications.shift();

      this.uiEventBatcher.enqueueEvent(NOTIFICATION_STATE_UI_EVENTS.UPDATED_NOTIFICATIONS);
    }
  }

  clearNotifications() {
    this._notifications.splice(0);

    this.uiEventBatcher.enqueueEvent(NOTIFICATION_STATE_UI_EVENTS.UPDATED_NOTIFICATIONS);
  }
}
