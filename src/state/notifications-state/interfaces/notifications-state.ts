import { INotification } from './notitification';
import { NotificationType } from '@shared/types';

export interface INotificationsState {
  pushNotification(notificationType: NotificationType, message: string, force?: boolean): void;
  getFirstUnreadNotification(): INotification | undefined;
  popUnreadNotification(): void;
  hasUnreadNotifications(): boolean;
  hasNextNotification(): boolean;
  clearNotifications(): void;
}
