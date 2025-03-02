import { BaseController } from '@shared/base-controller';
import { INotification } from '@state/notifications-state/interfaces/notitification';
import { IHistoryState } from '@shared/interfaces/history-state';

export class NotificationModalController extends BaseController {
  private _addedHistoryState = false;

  hasUnreadNotifications(): boolean {
    const hasNotifications = this.notificationsState.hasUnreadNotifications();

    if (hasNotifications && !this._addedHistoryState) {
      const newHistoryState: IHistoryState = {
        ...(window.history.state as IHistoryState),
      };
      window.history.pushState(newHistoryState, '');
    }

    this._addedHistoryState = hasNotifications;

    return hasNotifications;
  }

  hasNextNotification(): boolean {
    return this.notificationsState.hasNextNotification();
  }

  getUnreadNotification(): INotification | undefined {
    return this.notificationsState.getFirstUnreadNotification();
  }

  clearNotifications() {
    this.notificationsState.clearNotifications();
    this.handleRefreshUI();
  }

  popNotification(enabled: boolean): void {
    const notification = this.getUnreadNotification();

    if (notification) {
      this.settingsState.toggleNotificationType(notification.notificationType, enabled);
      this.notificationsState.popUnreadNotification();
      this.handleRefreshUI();
    }

    this._addedHistoryState = false;
  }
}
