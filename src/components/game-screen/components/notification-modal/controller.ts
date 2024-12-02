import { BaseController } from '@shared/base-controller';
import { INotification } from '@state/notifications-state/interfaces/notitification';
import { NotificationType } from '@shared/types';

export class NotificationModalController extends BaseController {
  hasUnreadNotifications(): boolean {
    return this.notificationsState.hasUnreadNotifications();
  }

  getUnreadNotification(): INotification | undefined {
    return this.notificationsState.getUnreadNotification();
  }

  popUnreadNotification(): void {
    this.notificationsState.popUnreadNotification();
  }

  isNotificationTypeEnabled(notificationType: NotificationType): boolean {
    return this.settingsState.isNotificationTypeEnabled(notificationType);
  }

  toggleNotificationType(notificationType: NotificationType, enabled: boolean) {
    this.settingsState.toggleNotificationType(notificationType, enabled);
  }
}
