import { BaseController } from '@shared/base-controller';
import { INotification } from '@state/notifications-state/interfaces/notitification';
import { NOTIFICATION_STATE_UI_EVENTS } from '@state/notifications-state/constants';
import { IHistoryState } from '@shared/interfaces/history-state';
import { INotificationModal } from './interfaces';

export class NotificationModalController extends BaseController<INotificationModal> {
  hostConnected() {
    super.hostConnected();

    this.addEventListener(this.notificationsState, NOTIFICATION_STATE_UI_EVENTS.UPDATED_NOTIFICATIONS);

    this.getUnreadNotification();
  }

  getUnreadNotification(): void {
    const notification = this.notificationsState.getUnreadNotification();

    if (this.host.notification !== notification) {
      this.host.notification = notification;

      if (notification) {
        const historyState: IHistoryState = window.history.state as IHistoryState;
        const newHistoryState: IHistoryState = {
          ...historyState,
          showNotification: true,
        };
        window.history.pushState(newHistoryState, '');
      }
    }
  }

  handleCloseModal(notification: INotification, enabled: boolean): void {
    this.settingsState.toggleNotificationType(notification.notificationType, enabled);
    this.notificationsState.popUnreadNotification();
    this.getUnreadNotification();
  }

  protected handleRefreshUI = (): void => {
    this.getUnreadNotification();

    this.host.requestUpdate();
  };
}
