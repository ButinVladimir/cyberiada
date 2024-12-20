import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { INotification } from './notitification';
import { NotificationType } from '@shared/types';

export interface INotificationsState extends IUIEventEmitter {
  pushNotification(notificationType: NotificationType, parameters?: Record<string, any>, force?: boolean): void;
  getUnreadNotification(): INotification | undefined;
  popUnreadNotification(): void;
  hasUnreadNotifications(): boolean;
}
