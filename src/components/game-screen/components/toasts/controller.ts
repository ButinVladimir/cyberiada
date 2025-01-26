import { BaseController } from '@shared/base-controller';
import { IMessage } from '@state/message-log-state/interfaces/message';

export class ToastsController extends BaseController {
  getToasts(): IMessage[] {
    return this.messageLogState.getToasts();
  }

  getToastDuration(): number {
    return this.settingsState.toastDuration;
  }
}
