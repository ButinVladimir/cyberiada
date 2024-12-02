import { NotificationType } from '@shared/types';

export interface INotification {
  notificationType: NotificationType;
  parameters?: Record<string, any>;
}
