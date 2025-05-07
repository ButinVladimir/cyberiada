import { BaseController } from '@shared/base-controller';
import { INotification } from '@state/notifications-state/interfaces/notitification';

export class NotificationModalController extends BaseController {
  hasUnreadNotifications(): boolean {
    return this.notificationsState.hasUnreadNotifications();
  }

  hasNextNotification(): boolean {
    return this.notificationsState.hasNextNotification();
  }

  getUnreadNotification(): INotification | undefined {
    return this.notificationsState.getFirstUnreadNotification();
  }

  clearNotifications() {
    this.notificationsState.clearNotifications();
    this.host.requestUpdate();
  }

  popNotification(enabled: boolean): void {
    const notification = this.getUnreadNotification();

    if (notification) {
      this.settingsState.toggleNotificationType(notification.notificationType, enabled);
      this.notificationsState.popUnreadNotification();
      this.host.requestUpdate();
    }
  }
}
