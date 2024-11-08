import { IMessage, MESSAGE_LOG_UI_EVENTS } from '@state/message-log-state';
import { BaseController } from '@shared/base-controller';

export class MessageLogContentController extends BaseController {
  hostConnected() {
    this.messageLogState.addUiEventListener(MESSAGE_LOG_UI_EVENTS.UPDATED_MESSAGES, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.messageLogState.removeUiEventListener(MESSAGE_LOG_UI_EVENTS.UPDATED_MESSAGES, this.handleRefreshUI);
  }

  getMessages(): IMessage[] {
    return this.messageLogState.getMessages();
  }
}
