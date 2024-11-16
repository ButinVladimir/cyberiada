import { IMessage } from '@state/message-log-state';
import { BaseController } from '@shared/base-controller';

export class MessageLogContentController extends BaseController {
  getMessages(): IMessage[] {
    return this.messageLogState.getMessages();
  }
}
