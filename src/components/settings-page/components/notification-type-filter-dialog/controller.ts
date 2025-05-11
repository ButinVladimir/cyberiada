import { BaseController } from '@shared/base-controller';
import { NotificationType } from '@shared/types';

export class NotificationTypeFilterDialogController extends BaseController {
  isNotificationTypeEnabled(notificationType: NotificationType): boolean {
    return this.settingsState.isNotificationTypeEnabled(notificationType);
  }

  toggleNotificationTypeFilter(notificationType: NotificationType, enabled: boolean) {
    this.settingsState.toggleNotificationType(notificationType, enabled);
    this.host.requestUpdate();
  }
}
