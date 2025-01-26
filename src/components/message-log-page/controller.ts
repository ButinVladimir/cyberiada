import { BaseController } from '@shared/base-controller';

export class MessageLogBarController extends BaseController {
  clearMessages() {
    this.messageLogState.clearMessages();
  }
}
