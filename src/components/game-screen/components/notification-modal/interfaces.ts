import { ReactiveControllerHost } from 'lit';
import { INotification } from '@state/notifications-state/interfaces/notitification';

export interface INotificationModal extends ReactiveControllerHost {
  notification?: INotification;
}
