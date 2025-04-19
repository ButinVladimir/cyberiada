import { NotificationType } from '@shared/types';

export interface INotification {
  notificationType: NotificationType;
  message: string;
}
